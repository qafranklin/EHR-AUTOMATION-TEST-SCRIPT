import { test, expect } from '@playwright/test';
import LoginPage from '../../../pageobject/LoginPage';

test('User Login', async({page}) => {
    const loginPage = new LoginPage(page);
    
    
    await loginPage.login('doctor');

});

