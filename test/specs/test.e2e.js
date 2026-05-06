import { browser, expect } from '@wdio/globals'

describe('Android App Tests', () => {
    
    it('should launch the app', async () => {
        // App should launch automatically
        await browser.pause(2000)
        console.log('App launched successfully')
    })

    it('should find and interact with app elements', async () => {
        // Use XPath for cross-platform compatibility
        const element = await $('//*[@text="Animation"]')
        
        // Check if element exists
        await expect(element).toBeDisplayed()
        
        // Tap the element
        await element.click()
        await browser.pause(1000)
        
        console.log('Element interaction successful')
    })
})

