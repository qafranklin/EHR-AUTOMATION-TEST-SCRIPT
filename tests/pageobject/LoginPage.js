const { expect } = require('@playwright/test');


class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameField = page.locator('#username');
    this.passwordField = page.locator('#password');
    this.loginButton = page.locator("button[type='submit']");
    this.userFullName = page.locator("span[ng-bind='vm.user.fullName']");
    this.homePageUrl = 'https://bizboxw22s:8084/app/user/user.html';
    this.welcomeText = page.locator('text=Electronic Health Records');

    // Define user credentials for different roles
    this.userCredentials = {
      superadmin: { username: 'superAdminUser', password: 'superAdminPass123', fullName: 'Super Admin' },
      admin: { username: 'admin', password: 'admin123', fullName: 'Admin User' },
      doctor: { username: 'doctorhan', password: 'abcdE@123', fullName: 'Han Montenegro' },
    };
  }

  // Navigate to the login page and validate title and URL
  async validatePage() {
    // Validate page title and URL
    await expect(this.page).toHaveTitle('One Login');
    console.log('Validate Page title: Passed');

    await expect(this.page).toHaveURL('https://bizboxw22s:8083/app/index/index.html#/login');
    console.log('Validate Page URL: Passed');
  }

  // Validate that the fields are visible and enabled before filling them
  async validateFields() {
    // Validate that the username field is visible and enabled
    await expect(this.usernameField).toBeVisible();
    await expect(this.usernameField).toBeEnabled();
    const isUsernameRequired = await this.usernameField.getAttribute('data-ng-required');
    await expect(isUsernameRequired).toBeTruthy(); // Ensure the field is required
    console.log('Validate Username Field: Passed');

    // Validate that the password field is visible and enabled
    await expect(this.passwordField).toBeVisible();
    await expect(this.passwordField).toBeEnabled();
    const isPassRequired = await this.passwordField.getAttribute('data-ng-required');
    await expect(isPassRequired).toBeTruthy();
    console.log('Validate Password Field: Passed');

    // Validate that the login button is visible and enabled
    await expect(this.loginButton).toBeVisible();
    console.log('Validate Login Button: Passed');

   
  }

  async validatelandingpage (){

    await expect(this.page).toHaveURL(this.homePageUrl);
    await expect(this.welcomeText).toBeVisible();
    console.log('Validate Landing Page: Passed');
  }

  // Method to login with a specific role
  async login(role) {
    const user = this.userCredentials[role];

    if (!user) {
      throw new Error(`Role ${role} not found`);
    }

    // Navigate to login page
    await this.page.goto('https://bizboxw22s:8083/app/index/index.html#/login');
    console.log('Navigate to login page');

    // Validate page title and URL
    await this.validatePage();

    // Validate the fields (username, password, and login button)
    await this.validateFields();

    // Fill in the username and password fields
    await this.usernameField.fill(user.username);
    console.log(`Filled Username Field with ${user.username}`);
    await this.passwordField.fill(user.password);
    console.log(`Filled Password Field with ${user.password}`);

    // Click the login button
    await this.loginButton.click();
    console.log('Clicked Login Button');

    //validate Landing Page
    await this.validatelandingpage();

    // Validate that the logged-in user is correct
    await expect(this.userFullName).toHaveText(user.fullName);
    console.log(`Logged in as: ${user.fullName}`);
  }
}

module.exports = LoginPage;
