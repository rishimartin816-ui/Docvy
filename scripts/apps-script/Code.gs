const DOCVY_SPREADSHEET_ID = '14iVy9HoeFnUpJbN8wga6MHHNcrChF27RNHDd6F-1yIo';
const DOCVY_LEADS_SHEET = 'Appointments';
const DOCVY_TOKEN_PROPERTY = 'DOCVY_WEBHOOK_TOKEN';
const DOCVY_MAX_BODY_LENGTH = 8000;
const DOCVY_LEAD_HEADERS = [
  'Booking ID', 'Created at (UTC)', 'Patient name', 'Mobile', 'Email',
  'Provider', 'Organisation', 'City', 'Facility', 'Requested date',
  'Requested time', 'Status', 'Privacy consent', 'Provider sharing consent',
  'Provider email notification status'
];

// Run once from the editor. This only adds the missing notification-status
// column and its header; it never clears or overwrites existing lead data.
function initializeDocvySheets() {
  const spreadsheet = SpreadsheetApp.openById(DOCVY_SPREADSHEET_ID);
  const leads = spreadsheet.getSheetByName(DOCVY_LEADS_SHEET);
  if (!leads) throw new Error('The Appointments tab is missing.');
  ensureDocvyLeadHeaders(leads);
  return 'DOCVY appointment intake is ready.';
}

function doPost(e) {
  const bodyText = e && e.postData && e.postData.contents;
  if (typeof bodyText !== 'string' || bodyText.length > DOCVY_MAX_BODY_LENGTH) {
    return docvyJson({ ok: false, error: 'Invalid request.' });
  }

  let data;
  try {
    data = JSON.parse(bodyText);
  } catch (parseError) {
    return docvyJson({ ok: false, error: 'Invalid request.' });
  }

  const expectedToken = PropertiesService.getScriptProperties()
    .getProperty(DOCVY_TOKEN_PROPERTY);
  if (!expectedToken || !constantTimeTokenMatch(data && data.token, expectedToken)) {
    return docvyJson({ ok: false, error: 'Unauthorized.' });
  }
  if (!validDocvyRequest(data)) return docvyJson({ ok: false, error: 'Invalid request.' });

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return docvyJson({ ok: false, error: 'Please retry.' });

  try {

    const spreadsheet = SpreadsheetApp.openById(DOCVY_SPREADSHEET_ID);
    const leads = spreadsheet.getSheetByName(DOCVY_LEADS_SHEET);
    if (!leads) throw new Error('Appointments tab is missing.');
    ensureDocvyLeadHeaders(leads);

    const prior = findDocvyReference(leads, data.ref);
    if (prior) return docvyJson({ ok: true, duplicate: true });

    const cache = CacheService.getScriptCache();
    const throttleKey = 'docvy-intake-' + data.ipFingerprint;
    const submissions = Number(cache.get(throttleKey) || 0);
    if (submissions >= 5) return docvyJson({ ok: false, throttled: true });
    cache.put(throttleKey, String(submissions + 1), 600);

    const row = leads.getLastRow() + 1;
    leads.getRange(row, 1, 1, DOCVY_LEAD_HEADERS.length).setValues([[
      docvySafe(data.ref),
      docvySafe(data.submittedAt),
      docvySafe(data.name),
      docvySafe(data.mobile),
      docvySafe(data.email || ''),
      docvySafe(data.provider),
      docvySafe(data.organisation),
      docvySafe(data.city),
      docvySafe(data.facility),
      docvySafe(data.requestedDate || ''),
      docvySafe(data.requestedTime || ''),
      'NEW — PROVIDER CONFIRMATION REQUIRED',
      'YES',
      'YES',
      'NOT_CONFIGURED'
    ]]);

    // Provider emails stay disabled until an organisation confirms its
    // appointment inbox and DOCVY implements the separately approved flow.
    return docvyJson({ ok: true });
  } catch (error) {
    return docvyJson({ ok: false, error: 'Request could not be saved.' });
  } finally {
    lock.releaseLock();
  }
}

function ensureDocvyLeadHeaders(sheet) {
  const requiredColumns = DOCVY_LEAD_HEADERS.length;
  if (sheet.getMaxColumns() < requiredColumns) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), requiredColumns - sheet.getMaxColumns());
  }
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, requiredColumns).setValues([DOCVY_LEAD_HEADERS]);
    return;
  }

  const existing = sheet.getRange(1, 1, 1, requiredColumns - 1).getDisplayValues()[0];
  if (DOCVY_LEAD_HEADERS.slice(0, -1).some((header, index) => existing[index] !== header)) {
    throw new Error('Appointments headers do not match the DOCVY setup.');
  }

  const lastHeader = sheet.getRange(1, requiredColumns).getDisplayValue();
  if (!lastHeader) sheet.getRange(1, requiredColumns).setValue(DOCVY_LEAD_HEADERS[requiredColumns - 1]);
  else if (lastHeader !== DOCVY_LEAD_HEADERS[requiredColumns - 1]) {
    throw new Error('Provider notification-status header does not match.');
  }
}

function findDocvyReference(sheet, reference) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;
  return sheet.getRange(2, 1, lastRow - 1, 1)
    .createTextFinder(reference)
    .matchEntireCell(true)
    .findNext();
}

function validDocvyRequest(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return false;
  const requiredText = ['submittedAt', 'name', 'mobile', 'provider', 'organisation', 'city', 'facility'];
  const mobile = String(data.mobile || '').replace(/^\+?91/, '').replace(/[\s()-]/g, '');
  return data.purpose === 'appointment_enquiry' &&
    typeof data.ref === 'string' && /^DV-[A-F0-9]{8}$/.test(data.ref) &&
    typeof data.providerId === 'string' && /^[a-z0-9-]{1,80}$/.test(data.providerId) &&
    requiredText.every(key => typeof data[key] === 'string' && data[key].trim().length > 0) &&
    Number.isFinite(Date.parse(data.submittedAt)) &&
    /^[6-9]\d{9}$/.test(mobile) &&
    (!data.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) &&
    (!data.requestedDate || /^\d{4}-\d{2}-\d{2}$/.test(data.requestedDate)) &&
    (!data.requestedTime || /^\d{2}:\d{2}$/.test(data.requestedTime)) &&
    data.privacyConsent === true && data.providerSharingConsent === true &&
    typeof data.ipFingerprint === 'string' && /^[a-f0-9]{64}$/.test(data.ipFingerprint);
}

function constantTimeTokenMatch(candidate, expected) {
  if (typeof candidate !== 'string' || typeof expected !== 'string' || candidate.length !== expected.length) {
    return false;
  }
  let difference = 0;
  for (let index = 0; index < expected.length; index += 1) {
    difference |= candidate.charCodeAt(index) ^ expected.charCodeAt(index);
  }
  return difference === 0;
}

function docvySafe(value, limit) {
  const text = String(value == null ? '' : value)
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .trim()
    .slice(0, limit || 1000);
  return /^[=+@-]/.test(text) ? "'" + text : text;
}

function docvyJson(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
