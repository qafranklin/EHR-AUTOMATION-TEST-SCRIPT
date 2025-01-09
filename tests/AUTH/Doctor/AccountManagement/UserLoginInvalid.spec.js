import { test, expect } from '@playwright/test';
import LoginPage from '../../../pageobject/LoginPage';

test('User Invalid Login', async({page}) => {
    const loginPage = new LoginPage(page);
    
    //Log In Incorrect Account 
    await loginPage.login('doctorinvld');
    

    //Validate Toaster Message 
    const toasterMessage = await page.locator('.toast-message');
    await expect(toasterMessage).toHaveText('Invalid Username or Password!');
    console.log('Toaster message validation passed: Invalid Username or Password!');

    // Step 7: Optionally log the toaster message content
    console.log('Toaster Message:', await toasterMessage.textContent());

});

