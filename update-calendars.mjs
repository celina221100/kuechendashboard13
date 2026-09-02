import { mkdir, writeFile } from "node:fs/promises";

const calendars = [
  ["arbeit.ics", "https://p186-caldav.icloud.com/published/2/OTcwODUxMjc4OTcwODUxMnYHZOSAWSz7CC0U1KYsWa-18GcHFWPUvu9r64Fw-qsD"],
  ["bildungswissenschaften.ics", "https://p186-caldav.icloud.com/published/2/OTcwODUxMjc4OTcwODUxMnYHZOSAWSz7CC0U1KYsWa_0baqMhuSRg-hWnquwcU7Bonu60meVFTa9sA1mjjGekf3XNKog8et67ciR64v_W5k"],
  ["gesundheit-und-pflege.ics", "https://p186-caldav.icloud.com/published/2/OTcwODUxMjc4OTcwODUxMnYHZOSAWSz7CC0U1KYsWa_U_rCjZQmjv3sAss5Q5bVZiZTVOQexOJcRYzKjhSF_OBqCE10hYESMACdJxiUg_1c"],
  ["anatomie.ics", "https://p186-caldav.icloud.com/published/2/OTcwODUxMjc4OTcwODUxMnYHZOSAWSz7CC0U1KYsWa8KJR4_F-u-xJ4Y5mJGPDBzDgkuY2mN5I0MFb3vbII051YhpTAEx9KUl2UWxnAK_mI"],
  ["geschichte.ics", "https://p186-caldav.icloud.com/published/2/OTcwODUxMjc4OTcwODUxMnYHZOSAWSz7CC0U1KYsWa8eWXmACVdtY9hTxHACqtb7OIOb4iHpL5FzJAZJ1GvZJ-evsZwTFjHXqK1Y0X_MHqQ"],
  ["psychosomatische-medizin.ics", "https://p186-caldav.icloud.com/published/2/OTcwODUxMjc4OTcwODUxMnYHZOSAWSz7CC0U1KYsWa85FUO7QEjSnP_azBVLffVReD6hzrwLWjsmRIJG5tz1n_cJbf3KI484WYuBHYboMwA"],
  ["wirkung-von-arzneimitteln.ics", "https://p186-caldav.icloud.com/published/2/OTcwODUxMjc4OTcwODUxMnYHZOSAWSz7CC0U1KYsWa-ndpeuQZO2E3mv1Qr8pXvO_TdWJERsyg8Dk33JJpQ9hTV3tfB3kp0rALYpWfLDebc"],
  ["termine.ics", "https://p186-caldav.icloud.com/published/2/OTcwODUxMjc4OTcwODUxMnYHZOSAWSz7CC0U1KYsWa-tQaUl0xQjTIoFQNnKD0GTisbkc5ci3PxJTHgHFsSswdMG-IB5j4zk5TLlrS-iwag"],
  ["wichtig.ics", "https://p186-caldav.icloud.com/published/2/OTcwODUxMjc4OTcwODUxMnYHZOSAWSz7CC0U1KYsWa-tbcx0dRvluyhnduX-5r6KgGeRzLhwZM524c1stKC_1sp8IBGx_-3Lu46LitmfwUk"],
  ["geburtstage.ics", "https://p186-caldav.icloud.com/published/2/OTcwODUxMjc4OTcwODUxMnYHZOSAWSz7CC0U1KYsWa998s-Zen04rgrDSKPHJB29vzkhxGJlTzrji2J7zCm-DsRRgaviSQfIC4LDvYMO1H0"],
  ["fabi.ics", "https://calendar.google.com/calendar/ical/fabian130800%40gmail.com/public/basic.ics"]
];

await mkdir("calendar-data", { recursive: true });
let failures = 0;

for (const [fileName, url] of calendars) {
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "Kitchen-Dashboard-Calendar-Sync/1.0" },
      signal: AbortSignal.timeout(30000)
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();
    if (!text.includes("BEGIN:VCALENDAR")) throw new Error("Antwort ist keine ICS-Datei");
    await writeFile(`calendar-data/${fileName}`, text, "utf8");
    console.log(`Aktualisiert: ${fileName}`);
  } catch (error) {
    failures++;
    console.error(`Fehler bei ${fileName}: ${error.message}`);
  }
}

if (failures === calendars.length) process.exitCode = 1;
