describe(
    "lingo landing page validation", async () => {
        // Helper function to dismiss cookie banner with better selectors
        const dismissCookies = async () => {
            try {
                // Wait a bit for page to load
                await browser.pause(1500);

                // Try multiple selectors for common cookie accept buttons
                const selectors = [
                    'button[aria-label*="accept" i]',
                    '.cookie-accept',
                    '#cookieAccept',
                    '[data-testid="cookie-accept"]',
                    'button[class*="accept"]'
                ];

                for (const selector of selectors) {
                    try {
                        const btn = await $(selector);
                        if (await btn.isDisplayed()) {
                            await btn.click();
                            await browser.pause(500);
                            console.log('✅ Cookie banner dismissed');
                            return;
                        }
                    } catch (e) {
                        // Continue to next selector
                    }
                }

                // If no button found, try to dismiss by keyboard
                try {
                    await browser.keys('Escape');
                    await browser.pause(500);
                    console.log('✅ Cookie banner closed (ESC key)');
                } catch (e) {
                    console.log('⚠️  Cookie banner not found');
                }
            } catch (e) {
                console.log('Cookie handling error:', e.message);
            }
        };

        beforeEach(async () => {
            await browser.url("https://www.hellolingo.com/")
            await dismissCookies();
        });

        it("should validate the landing page url and title", async () => {
            await browser.waitUntil(async () => {
                return await browser.getTitle() === "Lingo Glucose Biosensor & App — OTC CGM | Lingo by Abbott"
            }
                , 10000, "Expected title is Lingo Glucose Biosensor & App — OTC CGM | Lingo by Abbott");
            expect(browser).toHaveTitle(expect.toHaveTitle("Lingo Glucose Biosensor & App — OTC CGM | Lingo by Abbott"))
        }),
     it("should validate the why glucose", async () => {
await browser.waitUntil(async () => {
                    return await browser.getTitle() === "Lingo Glucose Biosensor & App — OTC CGM | Lingo by Abbott"
                }
                    , 10000, "Expected title is Lingo Glucose Biosensor & App — OTC CGM | Lingo by Abbott");
                const whyGlucoseLink = await $('button[data-analytics-action="why-glucose"]')
                await expect(whyGlucoseLink).toBeDisplayed()
                await whyGlucoseLink.moveTo();
                await browser.pause(2000)
                const link = await $("//a[normalize-space()='Glucose 101']")
                await expect(link).toBeDisplayed()
                const desc = await $("#nav-tray-why-glucose p.text-on-surface-alt.body-md")
                await expect(desc).toBeDisplayed()
                const actual = await desc.getText()
                const expected = "Glucose is a fuel that provides energy to your cells. It goes up and down throughout the day, typically rising after meals with carbs, intense exercise, or even stress."
                expect(actual).toEqual(expected)
            }),
            it("validate login button", async () => {


                const loginButton = await $('a[data-analytics-action="loginCta"]')
                await expect(loginButton).toBeDisplayed()
                await loginButton.click()
                await browser.pause(2000)
                const actualUrl = await browser.getUrl()
                const expectedUrl = "https://www.hellolingo.com/login"
                expect(actualUrl).toEqual(expectedUrl)

                const email = await $('input[type="email"]');

                await email.setValue('invalidemail'); // no @
                await email.setValue('Enter'); // or submit form
                const isValid = await email.getProperty('validity');

                expect(isValid.valid).toBe(false);
            })
    }
)