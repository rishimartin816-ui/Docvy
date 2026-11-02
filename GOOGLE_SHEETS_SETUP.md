# DOCVY appointment enquiries and provider email notifications

The appointment form collects contact details and an appointment preference only. It does not collect symptoms, diagnoses, medical records or payment data. A request is an enquiry, not a confirmed or reserved appointment.

When a patient explicitly consents, the server saves the enquiry in the private Google Sheet and emails it to the selected provider's verified appointment contact. No provider email is sent unless the contact is entered in **Provider Contacts**, marked **VERIFIED**, and notifications are enabled. If no verified contact exists, the request is saved with `NOT_CONFIGURED` and the patient is told that the provider was not emailed.

DOCVY does not charge the patient. The provider confirms any consultation fee and payment method directly with the patient. Provider listing or lead fees must be covered by a separate, accepted DOCVY plan; an enquiry notification is not an invoice or payment demand.

## Private spreadsheet

Use **DOCVY APPOINTMENT LEADS**, tab **Appointments**. The script adds the final notification-status column if the current 14-column header is present:

```text
Booking ID | Created at (UTC) | Patient name | Mobile | Email | Provider | Organisation | City | Facility | Requested date | Requested time | Status | Privacy consent | Provider sharing consent | Provider email notification status
```

Create a second tab called **Provider Contacts** with these exact headers:

```text
Provider ID | Provider name | Organisation | Appointment desk email | Verification status | Verified on (YYYY-MM-DD) | Notifications enabled
```

Only add official provider or appointment-desk email addresses that the clinic or hospital has confirmed for DOCVY enquiries. Set `Verification status` to `VERIFIED`, enter the verification date, and set `Notifications enabled` to `YES` only after the organisation has agreed to receive these enquiries. Use the provider IDs from `lib/provider-candidates.ts`. Each ID must occur once. Do not put patient details in this tab. Restrict both tabs to staff who need access; never publish the spreadsheet.

## Install the Apps Script

1. Open the spreadsheet and choose **Extensions → Apps Script**.
2. Replace the editor contents with the code below and save.
3. Run `initializeDocvySheets` once and approve the spreadsheet access prompt.
4. Run `authorizeDocvyEmail` once and approve the mail sending prompt. It reads the remaining sending quota but sends no email.
5. In **Project Settings → Script Properties**, add `DOCVY_WEBHOOK_TOKEN` with a randomly generated value of at least 32 characters. Keep it private; do not paste it into chat or commit it.
6. Choose **Deploy → New deployment → Web app**. Set **Execute as** to your account and access to **Anyone** so Vercel can call it. The script checks the private token on every request. Authorise and deploy.
7. Copy the deployed web app URL ending in `/exec`.

```javascript
const LEADS_SHEET = 'Appointments';
const CONTACTS_SHEET = 'Provider Contacts';
const LEAD_HEADERS = [
  'Booking ID', 'Created at (UTC)', 'Patient name', 'Mobile', 'Email',
  'Provider', 'Organisation', 'City', 'Facility', 'Requested date',
  'Requested time', 'Status', 'Privacy consent', 'Provider sharing consent',
  'Provider email notification status'
];
const CONTACT_HEADERS = [
  'Provider ID', 'Provider name', 'Organisation', 'Appointment desk email',
  'Verification status', 'Verified on (YYYY-MM-DD)', 'Notifications enabled'
];

function initializeDocvySheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let leads = ss.getSheetByName(LEADS_SHEET);
  if (!leads) leads = ss.insertSheet(LEADS_SHEET);
  ensureLeadHeaders(leads);
  let contacts = ss.getSheetByName(CONTACTS_SHEET);
  if (!contacts) contacts = ss.insertSheet(CONTACTS_SHEET);
  ensureContactHeaders(contacts);
}

// Run once manually to approve mail permission without sending an email.
function authorizeDocvyEmail() {
  return MailApp.getRemainingDailyQuota();
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return json({ ok: false, error: 'Please retry' });
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const expected = PropertiesService.getScriptProperties().getProperty('DOCVY_WEBHOOK_TOKEN');
    if (!expected || typeof data.token !== 'string' || data.token !== expected) {
      return json({ ok: false, error: 'Unauthorized' });
    }
    if (!validRequest(data)) return json({ ok: false, error: 'Invalid request' });

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const leads = ss.getSheetByName(LEADS_SHEET);
    const contacts = ss.getSheetByName(CONTACTS_SHEET);
    if (!leads || !contacts) throw new Error('Run initializeDocvySheets first');
    ensureLeadHeaders(leads);
    ensureContactHeaders(contacts);

    const existing = findReference(leads, data.ref);
    if (existing) {
      const priorStatus = String(leads.getRange(existing.getRow(), 15).getDisplayValue());
      return json({ ok: true, duplicate: true, providerNotified: priorStatus === 'SENT' });
    }

    const cache = CacheService.getScriptCache();
    const throttleKey = 'docvy-intake-' + data.ipFingerprint;
    const submissions = Number(cache.get(throttleKey) || 0);
    if (submissions >= 5) return json({ ok: false, throttled: true });
    cache.put(throttleKey, String(submissions + 1), 600);

    const recipient = findVerifiedRecipient(contacts, data);
    const status = 'NEW — PROVIDER CONFIRMATION REQUIRED';
    const row = leads.getLastRow() + 1;
    leads.getRange(row, 1, 1, LEAD_HEADERS.length).setValues([[
      safe(data.ref), safe(data.submittedAt), safe(data.name), safe(data.mobile),
      safe(data.email || ''), safe(data.provider), safe(data.organisation),
      safe(data.city), safe(data.facility), safe(data.requestedDate || ''),
      safe(data.requestedTime || ''), status, 'YES', 'YES',
      recipient ? 'PENDING' : 'NOT_CONFIGURED'
    ]]);

    if (!recipient) return json({ ok: true, providerNotified: false });
    try {
      if (MailApp.getRemainingDailyQuota() < 1) throw new Error('Daily mail quota reached');
      MailApp.sendEmail({
        to: recipient,
        subject: 'DOCVY appointment request | ' + safe(data.ref, 40),
        body: providerEmailBody(data),
        name: 'DOCVY Appointment Desk',
        replyTo: 'contact@docvy.in'
      });
    } catch (mailError) {
      try { leads.getRange(row, 15).setValue('FAILED'); } catch (statusError) {}
      return json({ ok: true, providerNotified: false });
    }
    try { leads.getRange(row, 15).setValue('SENT'); } catch (statusError) {}
    return json({ ok: true, providerNotified: true });
  } catch (error) {
    return json({ ok: false, error: 'Request could not be saved' });
  } finally {
    lock.releaseLock();
  }
}

function validRequest(data) {
  return data.purpose === 'appointment_enquiry' &&
    typeof data.ref === 'string' && /^DV-[A-F0-9]{8}$/.test(data.ref) &&
    typeof data.providerId === 'string' && /^[a-z0-9-]{1,80}$/.test(data.providerId) &&
    ['submittedAt', 'name', 'mobile', 'provider', 'organisation', 'city', 'facility'].every(key =>
      typeof data[key] === 'string' && data[key].trim().length > 0) &&
    Number.isFinite(Date.parse(data.submittedAt)) &&
    /^[6-9]\d{9}$/.test(String(data.mobile).replace(/^\+?91/, '').replace(/[\s()-]/g, '')) &&
    (!data.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) &&
    (!data.requestedDate || /^\d{4}-\d{2}-\d{2}$/.test(data.requestedDate)) &&
    (!data.requestedTime || /^\d{2}:\d{2}$/.test(data.requestedTime)) &&
    data.privacyConsent === true && data.providerSharingConsent === true &&
    typeof data.ipFingerprint === 'string' && /^[a-f0-9]{64}$/.test(data.ipFingerprint);
}

function ensureLeadHeaders(sheet) {
  if (sheet.getMaxColumns() < LEAD_HEADERS.length) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), LEAD_HEADERS.length - sheet.getMaxColumns());
  }
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, LEAD_HEADERS.length).setValues([LEAD_HEADERS]);
    return;
  }
  const existing = sheet.getRange(1, 1, 1, LEAD_HEADERS.length - 1).getDisplayValues()[0];
  if (LEAD_HEADERS.slice(0, -1).some((header, index) => existing[index] !== header)) {
    throw new Error('Appointments header row does not match setup guide');
  }
  const notificationHeader = sheet.getRange(1, LEAD_HEADERS.length).getDisplayValue();
  if (!notificationHeader) sheet.getRange(1, LEAD_HEADERS.length).setValue(LEAD_HEADERS[LEAD_HEADERS.length - 1]);
  else if (notificationHeader !== LEAD_HEADERS[LEAD_HEADERS.length - 1]) throw new Error('Notification status header does not match');
}

function ensureContactHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, CONTACT_HEADERS.length).setValues([CONTACT_HEADERS]);
    return;
  }
  const existing = sheet.getRange(1, 1, 1, CONTACT_HEADERS.length).getDisplayValues()[0];
  if (CONTACT_HEADERS.some((header, index) => existing[index] !== header)) {
    throw new Error('Provider Contacts header row does not match setup guide');
  }
}

function findReference(sheet, reference) {
  if (sheet.getLastRow() < 2) return null;
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, 1)
    .createTextFinder(reference).matchEntireCell(true).findNext();
}

function findVerifiedRecipient(sheet, data) {
  const rows = sheet.getDataRange().getValues().slice(1);
  const matches = rows.filter(row => String(row[0]).trim() === data.providerId);
  if (matches.length !== 1) return '';
  const row = matches[0];
  const email = String(row[3] || '').trim();
  const verifiedOn = String(row[5] || '').trim();
  if (String(row[1]).trim() !== data.provider ||
      String(row[2]).trim() !== data.organisation ||
      String(row[4]).trim().toUpperCase() !== 'VERIFIED' ||
      !/^\d{4}-\d{2}-\d{2}$/.test(verifiedOn) ||
      String(row[6]).trim().toUpperCase() !== 'YES' ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return '';
  return email;
}

function providerEmailBody(data) {
  return [
    'Hello appointment team,',
    '',
    'A patient has asked DOCVY to share this appointment enquiry with your verified appointment contact.',
    'Reference: ' + safe(data.ref),
    'Doctor: ' + safe(data.provider),
    'Organisation: ' + safe(data.organisation),
    'Facility and city: ' + safe(data.facility) + ', ' + safe(data.city),
    'Patient name: ' + safe(data.name),
    'Mobile: ' + safe(data.mobile),
    'Email: ' + safe(data.email || 'Not provided'),
    'Preferred date: ' + safe(data.requestedDate || 'Not specified'),
    'Preferred time: ' + safe(data.requestedTime || 'Not specified'),
    '',
    'This is an enquiry only, not a confirmed or reserved appointment. Please contact the patient to confirm the doctor, available time, consultation fee and payment method. The patient pays any consultation fee directly to your organisation; DOCVY does not collect it.',
    '',
    'To discuss a DOCVY provider listing or enquiry plan, contact contact@docvy.in. Any DOCVY service fee applies only under a separate plan accepted by your organisation. This email is not an invoice.',
    '',
    'Please use the patient contact details only to respond to this enquiry.',
    '',
    'DOCVY Appointment Desk'
  ].join('\n');
}

function safe(value, limit) {
  const text = String(value == null ? '' : value).replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, limit || 1000);
  return /^[=+@-]/.test(text) ? "'" + text : text;
}

function json(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Connect Vercel

In **Vercel → DOCVY → Settings → Environment Variables**, add these as **Sensitive** variables scoped to **Production** (and Preview only if needed):

- `GOOGLE_SHEETS_WEBHOOK_URL` — the deployed Apps Script `/exec` URL
- `GOOGLE_SHEETS_WEBHOOK_TOKEN` — the same private token saved in Apps Script Script Properties

Save the variables and redeploy Production. Do not use `NEXT_PUBLIC_` names for either value.

## Verify safely

1. Confirm the selected provider has exactly one matching row in **Provider Contacts** and that its official appointment inbox was confirmed directly by the provider or organisation.
2. Use synthetic patient details for the first enquiry. If the provider email is not yet verified, the form should still save the request and show that no provider email was sent; the sheet should show `NOT_CONFIGURED`.
3. To verify actual email delivery without sending synthetic patient data to a real provider, temporarily use an appointment test address controlled by DOCVY, mark that test mapping clearly, submit synthetic details, confirm delivery and the `SENT` status, then remove the test mapping before enabling real provider notifications.
4. Confirm that the provider email says enquiry only and asks the provider to confirm availability and fee. It does not say the appointment is booked.

If either Vercel environment variable is missing, DOCVY disables submissions. Do not send real patient details to a provider until the patient consents and the provider's contact is verified. Apps Script uses Google's `MailApp` service, which requires the Workspace owner to authorize mail sending; Google exposes the remaining daily recipient quota through `getRemainingDailyQuota()`.
