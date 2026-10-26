# Connect Docvy form submissions to Google Sheets (no payment gateway)

The request form sends only the request purpose, name, email, mobile number, consent flags, timestamp and reference ID. It does not ask for payment details or collect medical reports.

## 1. Create the sheet

Create a Google Sheet and name its first tab `Requests` (or change `SHEET_NAME` in the script below). Add no manual columns; the script creates the header row.

## 2. Add the Apps Script

In the sheet, open **Extensions → Apps Script**, replace the editor contents with the code below, and save.

```javascript
const SHEET_NAME = 'Requests';

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const required = ['ref', 'purpose', 'name', 'email', 'mobile', 'submittedAt'];
    if (!required.every(key => typeof data[key] === 'string' && data[key].length > 0)) {
      return json({ ok: false, error: 'Missing required fields' });
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error('Sheet tab not found: ' + SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Reference ID', 'Submitted At (UTC)', 'Purpose', 'Full Name', 'Email', 'Mobile', 'Privacy Consent', 'Terms Consent', 'Certificate Disclaimer Accepted', 'Status']);
    }
    sheet.appendRow([
      safe(data.ref), safe(data.submittedAt), safe(data.purpose), safe(data.name),
      safe(data.email), safe(data.mobile), Boolean(data.privacyConsent),
      Boolean(data.termsConsent), Boolean(data.certificateDisclaimerAccepted), safe(data.status || 'New')
    ]);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err && err.message || err) });
  }
}

// Prevent user-supplied text from being interpreted as a spreadsheet formula.
function safe(value) {
  const text = String(value == null ? '' : value).slice(0, 1000);
  return /^[=+@]/.test(text) || /^-/.test(text) ? "'" + text : text;
}

function json(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 3. Deploy as a web app

1. In Apps Script choose **Deploy → New deployment**.
2. Select **Web app** as the deployment type.
3. Set **Execute as** to your account.
4. Set access to **Anyone** so the Vercel server can call the endpoint. This endpoint will accept submitted form records; do not put sensitive health information in this form. If your organisation requires authenticated access, use an authenticated integration instead.
5. Click **Deploy**, authorise the script, and copy the Web app URL ending in `/exec`.

## 4. Add the URL to Vercel

In Vercel, open your Docvy project → **Settings → Environment Variables**. Add:

- Name: `GOOGLE_SHEETS_WEBHOOK_URL`
- Value: the deployed Apps Script `/exec` URL
- Environments: Production (and Preview if needed)

Save and redeploy. Do not commit the URL to GitHub or put it in client-side code.

## 5. Test before launch

Submit a test request using dummy contact details and confirm a new row appears in the sheet. Also test invalid fields and verify no row is created. Restrict access to the spreadsheet to staff who need it, enable two-step verification on the Google account, and set a retention policy for personal data.

**Important:** This integration sends contact information to the sheet. Do not collect or store medical reports or detailed health information in this workflow. Update your Privacy Policy to explain the use of Google Sheets before collecting real users' details.
