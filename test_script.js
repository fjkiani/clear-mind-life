const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

    console.log("Testing Triage Page...");
    // 1. Triage Page
    await page.goto('http://localhost:4000/dashboard/healthcare');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: '/Users/fahadkiani/.gemini/antigravity/brain/7425afcb-1fbd-4965-8f1b-f1fa707e9942/triage_light_mode_v2.png', fullPage: true });

    console.log("Running Triage Agent...");
    // Run a triage to see timeline
    await page.fill('textarea', 'I need a telehealth appointment for anxiety');
    await page.click('button:has-text("Run Agent →")');
    await page.waitForTimeout(10000); // Wait for agent
    await page.screenshot({ path: '/Users/fahadkiani/.gemini/antigravity/brain/7425afcb-1fbd-4965-8f1b-f1fa707e9942/triage_results_light_mode.png', fullPage: true });

    console.log("Testing Register Page...");
    // 2. Register Page
    await page.goto('http://localhost:4000/dashboard/healthcare/register');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: '/Users/fahadkiani/.gemini/antigravity/brain/7425afcb-1fbd-4965-8f1b-f1fa707e9942/register_light_mode.png', fullPage: true });

    console.log("Testing Appointments Page...");
    // 3. Appointments list
    await page.goto('http://localhost:4000/dashboard/healthcare/appointments');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: '/Users/fahadkiani/.gemini/antigravity/brain/7425afcb-1fbd-4965-8f1b-f1fa707e9942/appointments_light_mode_v2.png', fullPage: true });

    await browser.close();
    console.log("Done!");
})();
