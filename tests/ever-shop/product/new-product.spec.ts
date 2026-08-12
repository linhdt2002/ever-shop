import { test, expect, Page } from '@playwright/test';
import { data } from '../../../data/login-data';
import { clickButtonByLabel, inputTextboxByLabel } from '../../../src/common';
import { ADMIN_PASSWORD, ADMIN_USERNAME, URL } from '../../../src/utils/constant-utils';

test.beforeEach("Navigate", async ({page})=> {
    await page.goto(URL);
});

test('Verify login successful', async ({ page }) => {
  await inputTextboxByLabel("Email", ADMIN_USERNAME, page);
  await inputTextboxByLabel("Password", ADMIN_PASSWORD, page);
  await clickButtonByLabel("SIGN IN", page);
  let dashboardHeaderXpath = `//h1[contains(concat(" ", @class, " "), " page-heading-title ") and normalize-space()="Dashboard"]`;
  await expect(page.locator(dashboardHeaderXpath)).toBeVisible();
});