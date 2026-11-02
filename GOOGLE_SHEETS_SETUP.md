# DOCVY appointment enquiries → Google Sheets

This is a server-to-server connection. The browser never receives the Apps Script URL or shared token. The form collects contact details and an appointment preference only; it does not ask for symptoms, diagnoses, medical records or payment data. A request is an enquiry, not a confirmed appointment.

## Sheet

Use the existing private spreadsheet **DOCVY APPOINTMENT LEADS**, tab **Appointments**. Its header row must be exactly:

```text
Booking ID | Created at (UTC) | Patient name | Mobile | Email | Provider | Organisation | City | Facility | Requested date | Requested time | Status | Privacy consent | Provider sharing consent
```

Restrict sheet access to staff who need it. Do not publish this sheet to the web.

## Create and secure the Apps Script endpoint

1. Open the sheet and choose **Extensions → Apps Script**.
2. Replace the editor content with the script below and save.
3. In **Project Settings → Script Properties**, add `DOCVY_WEBHOOK_TOKEN` with a randomly generated value of at least 32 characters. Keep it private; do not paste it into chat or commit it.
4. Choose **Deploy → New deployment → Web app**. Set **Execute as** to your account and access to **Anyone** so Vercel can call the web app. The script rejects requests without the private token. Authorise and deploy.
5. Copy the deployed web app URL ending in `/exec`.

```javascript
const SHEET_NAME = 'Appointments';
const HEADERS = [
  'Booking ID', 'Created at (UTC)', 'Patient name', 'Mobile', 'Email',
  'Provider', 'Organisation', 'City', 'Facility', 'Requested date',
  'Requested time', 'Status', 'Privacy consent', 'Provider sharing consent'
];

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const expected = PropertiesService.getScriptProperties().getProperty('DOCVY_WEBHOOK_TOKEN');
    if (!expected || typeof data.token !== 'string' || data.token !== expected) {
      return json({ ok: false, error: 'Unauthorized' });
    }
    const required = ['ref', 'submittedAt', 'name', 'mobile', 'provider', 'organisation', 'city', 'facility'];
    if (!required.every(key => typeof data[key] === 'string' && data[key].trim().length > 0) ||
        data.privacyConsent !== true || data.providerSharingConsent !== true ||
        typeof data.ipFingerprint !== 'string' || !/^[a-f0-9]{64}$/.test(data.ipFingerprint)) {
      return json({ ok: false, error: 'Invalid request' });
    }
    const cache = CacheService.getScriptCache();
    const throttleKey = 'docvy-intake-' + data.ipFingerprint;
    const submissions = Number(cache.get(throttleKey) || 0);
    if (submissions >= 5) return json({ ok: false, throttled: true });
    cache.put(throttleKey, String(submissions + 1), 600);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error('Appointments tab not found');
    if (sheet.getLastRow() === 0) sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    const actual = sheet.getRange(1, 1, 1, HEADERS.length).getDisplayValues()[0];
    if (HEADERS.some((header, index) => actual[index] !== header)) throw new Error('Appointments header row does not match setup guide');
    sheet.appendRow([
      safe(data.ref), safe(data.submittedAt), safe(data.name), safe(data.mobile),
      safe(data.email || ''), safe(data.provider), safe(data.organisation),
      safe(data.city), safe(data.facility), safe(data.requestedDate || ''),
      safe(data.requestedTime || ''), 'NEW — PROVIDER CONFIRMATION REQUIRED',
      'YES', 'YES'
    ]);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: 'Request could not be saved' });
  }
}

function safe(value) {
  const text = String(value == null ? '' : value).slice(0, 1000);
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

## Verify the live journey

1. Open a listed doctor profile inside DOCVY and choose **Request appointment enquiry**.
2. Submit only synthetic contact details and confirm the row appears in **Appointments** with status `NEW — PROVIDER CONFIRMATION REQUIRED`.
3. Verify the form reports an enquiry reference. The reference confirms receipt only; it is not a confirmed appointment.
4. Do not send real patient data to a provider until the patient has consented and the provider channel and operational handling have been verified.

If either environment variable is missing, DOCVY disables the form and does not accept submissions. No payment is collected by DOCVY; the provider confirms availability and any consultation fee directly.
