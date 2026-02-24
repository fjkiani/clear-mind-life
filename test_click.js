const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err));
    page.on('requestfailed', request => console.log('REQ FAILED:', request.url(), request.failure().errorText));

    console.log("Navigating...");
    await page.goto('http://localhost:4000/dashboard/healthcare/telehealth', { waitUntil: 'networkidle' });
    
    // Fill the form and create room
    await page.fill('input[placeholder="MRN-12345"]', 'PAT-123');
    await page.fill('input[placeholder="dr_smith"]', 'PROV-456');
    await page.click('button:has-text("Create Telehealth Video Room")');
    
    // Wait for the room to be created and "Join Patient" button to appear
    await page.waitForTimeout(2000);
    
    console.log("Clicking Join Patient...");
    await page.click('button:has-text("Join Patient")');
    
    // Wait to see what happens
    await page.waitForTimeout(3000);
    
    // take screenshot
    await page.screenshot({ path: 'telehealth_join_debug.png' });
    
    await browser.close();
    console.log("Done!");
})();
