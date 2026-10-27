# Lead endpoint: server-side phone validation

The site posts leads to a Google Apps Script web app (`src/config/sfdcConfig.ts`). The browser
validates phone numbers before submitting, but anything can POST to the endpoint directly, so the
script must repeat the check. `PhoneValidation.js` runs the same rules as the site
(`src/lib/phone.ts`, libphonenumber with full metadata).

## Install / update

1. `npm run build:apps-script` (regenerates `PhoneValidation.js`; rerun after upgrading `libphonenumber-js`
   or changing `src/lib/phone.ts`).
2. In the Apps Script editor, add a script file named `PhoneValidation` and paste the contents of
   `PhoneValidation.js` into it. The project must use the V8 runtime (the default).
3. In `doPost`, validate before forwarding to Salesforce:

```js
const data = JSON.parse(e.postData.contents);

const phone = validateLeadPhone(data.phone, data.country_code);
if (!phone.valid) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "error", field: "phone", message: phone.error })
  ).setMimeType(ContentService.MimeType.JSON);
}
data.phone = phone.nationalNumber; // "501234567"
data.country_code = phone.countryCode; // "+971"
// phone.e164 ("+971501234567") and phone.country ("AE") are also available
```

The site shows `message` under the phone field when the response has `field: "phone"`.

## Payload

`phone` is the national number and `country_code` the calling code detected from what the visitor
typed (`+91`, `+971`, `+1`, ...). Before this change `country_code` was always `+91`.
`validateLeadPhone` also accepts a full international number in `phone`, and treats a number with
no country code as Indian, matching the site.
