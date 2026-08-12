import { test, expect, Page } from '@playwright/test';
import { data } from '../../../data/login-data';
import { clickButtonByLabel, inputTextboxByLabel, verifyFieldErrorMessageByLabel } from '../../../src/common';

test.beforeEach("Navigate", async ({page})=> {
    await page.goto('https://demo.evershop.io/admin/login');
});

for (let input of data) {
    test(`Verify login fail when username is ${input.username} and password is ${input.password}`, async ({ page }) => {
    await inputTextboxByLabel("Email", input.username, page);
    await inputTextboxByLabel("Password", input.password, page);
    await clickButtonByLabel("SIGN IN", page);
    for (let item of input.expected) {
        await verifyFieldErrorMessageByLabel(item.field, item.message, page);
    }
});
}

test('Verify login successful', async ({ page }) => {
  await inputTextboxByLabel("Email", "demo@evershop.io", page);
  await inputTextboxByLabel("Password", "123456", page);
  await clickButtonByLabel("SIGN IN", page);
  let dashboardHeaderXpath = `//h1[contains(concat(" ", @class, " "), " page-heading-title ") and normalize-space()="Dashboard"]`;
  await expect(page.locator(dashboardHeaderXpath)).toBeVisible();
});

test('Verify login fail when username is empty', async ({ page }) => {
  await inputTextboxByLabel("Email", "", page);
  await inputTextboxByLabel("Password", "123456", page);
  await clickButtonByLabel("SIGN IN", page);
  await verifyFieldErrorMessageByLabel("Email", "Email is required", page);
});

test('Verify login fail when password is empty', async ({ page }) => {
  await inputTextboxByLabel("Email", "demo@evershop.io", page);
  await inputTextboxByLabel("Password", "", page);
  await clickButtonByLabel("SIGN IN", page);
  await verifyFieldErrorMessageByLabel("Password", "Password is required", page);
});

test('Verify login fail when password is invalid', async ({ page }) => {
  await inputTextboxByLabel("Email", "Invalid email", page);
  await inputTextboxByLabel("Password", "123456", page);
  await clickButtonByLabel("SIGN IN", page);
  await verifyFieldErrorMessageByLabel("Email", "Please enter a valid email address", page);
});

