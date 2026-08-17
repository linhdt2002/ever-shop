import { test, expect, Page } from '@playwright/test';
import { data } from '../../../data/login-data';
import { LoginPage } from '../../../src/pages/login-page';
import { DashboardPage } from '../../../src/pages/dashboard-page';
import { URL } from '../../../src/utils/constant-utils';

let loginPage: LoginPage;
let dashboardPage: DashboardPage;
test.beforeEach("Navigate", async ({page})=> {
    await page.goto(URL);
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
  });

for (let input of data) {
    test(`Verify login fail when username is ${input.username} and password is ${input.password}`, async ({ page }) => {
      loginPage.login(input.username, input.password);
      for (let item of input.expected) {
          await loginPage.verifyFieldErrorMessageByLabel(item.field, item.message);
      }
});
}

test('Verify login successful', async ({ page }) => {
  loginPage.login("dtlinh010202@gmail.com", "password");
  await dashboardPage.isOnPage();
});