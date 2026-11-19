// Local-only visual review. Never submits forms or mutates live data.
const assert = require("node:assert/strict"),
  fs = require("node:fs"),
  path = require("node:path");
const { chromium } = require(
  path.resolve(__dirname, "../../crm-browser-check/package"),
);
const base = process.argv[2] || "http://localhost:3112";
if (!/^http:\/\/localhost:\d+$/.test(base))
  throw Error("Visual review must use an isolated local server");
const out = path.resolve(__dirname, "../docs/visual-review/actual");
fs.mkdirSync(out, { recursive: true });
const pages = [
  ["footer", "/design-review/footer", "footer.jpg", 512],
  ["homepage", "/", "homepage.jpg", 512],
  ["for-doctors", "/for-doctors", "for-doctors.jpg", 510],
  ["for-clinics", "/for-clinics", "for-clinics.jpg", 510],
  ["provider", "/for-doctors-and-clinics", "provider_landing.jpg", 512],
  ["how-it-works", "/how-it-works", "how_it_works.jpg", 512],
  ["pricing", "/pricing", "pricing.jpg", 512],
  ["partner", "/partner-with-us", "attachment-7.jpg", 512],
  ["care-guide", "/care-guide", "care_guide.jpg", 512],
  ["surgery-guide", "/surgery-guide", "surgery.jpg", 512],
  ["about", "/about", "about.jpg", 512],
  ["contact", "/contact", "contact.jpg", 512],
  ["faqs", "/faqs", "faq.jpg", 512],
  ["specialties", "/specialties", "specialty_reference.jpg", 1536],
  [
    "doctor-profile",
    "/doctor/dr-ummed-kumar-meena",
    "doctor-profile-overview.jpg",
    504,
  ],
];
(async () => {
  const browser = await chromium.launch({
    executablePath:
      "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    headless: true,
  });
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const results = [];
  try {
    for (const [id, route, ref, width] of pages) {
      await page.setViewportSize({ width, height: 900 });
      const r = await page.goto(base + route, {
        waitUntil: "networkidle",
        timeout: 120000,
      });
      assert.equal(r.status(), 200, route);
      await page.evaluate(() => document.fonts.ready);
      await page
        .locator("img")
        .evaluateAll((es) => es.forEach((i) => (i.loading = "eager")));
      await page.waitForFunction(
        () => [...document.images].every((i) => i.complete),
        {},
        { timeout: 20000 },
      );
      await page.screenshot({
        path: path.join(out, id + ".png"),
        fullPage: true,
      });
      const result = await page.evaluate(() => ({
        height: document.documentElement.scrollHeight,
        width: innerWidth,
        overflow: document.documentElement.scrollWidth > innerWidth,
        h1: document.querySelectorAll("h1").length,
        brokenImages: [...document.images]
          .filter((i) => !i.complete || !i.naturalWidth)
          .map((i) => i.getAttribute("src")),
        canonical: document
          .querySelector('link[rel="canonical"]')
          ?.getAttribute("href"),
      }));
      assert(!result.overflow, id + " overflow");
      assert.equal(result.h1, 1, id + " h1");
      assert.equal(result.brokenImages.length, 0, id + " broken images");
      if (id === "doctor-profile") {
        await page.locator("#locations").scrollIntoViewIfNeeded();
        await page.screenshot({
          path: path.join(out, "doctor-profile-locations.png"),
        });
      }
      results.push({
        id,
        route,
        reference: ref,
        actual: id + ".png",
        ...result,
      });
      console.log("CAPTURED", id, result.width, result.height);
    }
    // Mobile/desktop regression across shared shell and page templates.
    for (const width of [320, 390, 1440])
      for (const route of [
        "/",
        "/pricing",
        "/partner-with-us",
        "/doctor/dr-ummed-kumar-meena",
      ]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(base + route, {
          waitUntil: "networkidle",
          timeout: 120000,
        });
        assert(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          route + " " + width + " overflow",
        );
      }
    await page.setViewportSize({ width: 512, height: 900 });
    await page.goto(base + "/faqs", { waitUntil: "networkidle" });
    await page
      .getByRole("textbox", { name: "Search questions" })
      .fill("multiple");
    assert.equal(await page.locator(".mock-faqs details").count(), 1);
    await page.getByRole("textbox", { name: "Search questions" }).fill("");
    await page
      .getByRole("button", { name: "For Patients", exact: true })
      .click();
    assert.equal(await page.locator(".mock-faqs details").count(), 1);
    await page.goto(base + "/pricing", { waitUntil: "networkidle" });
    await page
      .getByRole("button", { name: "For Clinics & Hospitals", exact: true })
      .click();
    assert.equal(
      await page
        .locator(".mock-price")
        .filter({ hasText: "Contact us" })
        .count(),
      3,
    );
    await page.goto(base + "/partner-with-us", { waitUntil: "networkidle" });
    await page.locator("#partner-application > summary").click();
    assert(
      await page.getByRole("button", { name: "Submit Profile" }).isVisible(),
    );
    await page.goto(base, { waitUntil: "networkidle" });
    await page
      .getByRole("textbox", { name: "Search doctor, specialty or condition" })
      .fill("Ummed");
    await page
      .getByRole("button", { name: "Find Doctors", exact: true })
      .click();
    await page.waitForURL((u) => u.pathname === "/doctors");
    assert(
      await page
        .getByRole("link", { name: "Dr. Ummed Kumar Meena", exact: true })
        .count(),
    );
    assert.equal(errors.length, 0, errors.join("\n"));
    fs.writeFileSync(
      path.join(out, "verification.json"),
      JSON.stringify(
        {
          base,
          checkedAt: new Date().toISOString(),
          results,
          browserErrors: errors,
          interactions: [
            "FAQ search/category",
            "Pricing audience toggle",
            "Existing partner form visible",
            "Homepage search reaches real profile",
          ],
          note: "Reference images may contain device frames and OS status bars, which are not web UI. Screenshot capture does not imply visual approval.",
        },
        null,
        2,
      ),
    );
    console.log(
      "PASS local responsive, SEO head, images, interactions and existing search",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});

