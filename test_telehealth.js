const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

    console.log("Testing Telehealth Page...");
    await page.goto('http://localhost:4000/dashboard/healthcare/telehealth');
    await page.waitForTimeout(3000); // Wait for iframe to load
    await page.screenshot({ path: '/Users/fahadkiani/.gemini/antigravity/brain/7425afcb-1fbd-4965-8f1b-f1fa707e9942/zeta_telehealth_portal.png', fullPage: true });

    await browser.close();
    console.log("Done!");
})();
