import { test, expect, Page } from '@playwright/test';
import { data } from '../../../data/login-data';
import { clickButtonByLabel, clickDropdownByLabel, clickMenuItemByLabel, clickRadioByLabel, inputTextboxByLabel, verifyNotificationMessage } from '../../../src/common';
import { ADMIN_PASSWORD, ADMIN_USERNAME, URL } from '../../../src/utils/constant-utils';
import path from "path";

test.beforeEach("Navigate", async ({page})=> {
    await page.goto(URL);
});

test('Verify login successful', async ({ page }) => {
  await inputTextboxByLabel("Email", ADMIN_USERNAME, page);
  await inputTextboxByLabel("Password", ADMIN_PASSWORD, page);
  await clickButtonByLabel("SIGN IN", page);

  //Verify user on Dashboard page
  let dashboardHeaderXpath = `//h1[contains(concat(" ", @class, " "), " page-heading-title ") and normalize-space()="Dashboard"]`;
  await expect(page.locator(dashboardHeaderXpath)).toBeVisible();
  await clickMenuItemByLabel("New Product", page);

  //Verify user on New Product page
  let createANewProductXpath = `//h1[contains(concat(" ", @class, " "), " page-heading-title ") and normalize-space()="Create a new product"]`;
  await expect(page.locator(createANewProductXpath)).toBeVisible();

  //Input product's info
  const random = new Date().getTime();
  await inputTextboxByLabel("Name", `Iphone ${random}`, page);
  await inputTextboxByLabel("SKU", `SKU ${random}`, page);
  await inputTextboxByLabel("Price", "1500", page);
  await inputTextboxByLabel("Weight", "50", page);
  await inputTextboxByLabel("Url key", `URL key ${random}`, page);
  await inputTextboxByLabel("Meta title", "dlgjaelga", page);
  await inputTextboxByLabel("Meta keywords", "dlgjaelga", page);
  await inputTextboxByLabel("Meta description", "agaegaeg", page);
  await inputTextboxByLabel("Quantity", "5", page);

  await clickDropdownByLabel("Tax class", "Taxable Goods", page);
  await uploadImage("data/test.png", page);
  await clickDropdownByLabel("Attribute group", "Default", page);
  await clickDropdownByLabel("Color", "White", page);
  await clickDropdownByLabel("Size", "XL", page);

  await clickRadioByLabel("Status", "Disabled", page);
  await clickRadioByLabel("Visibility", "Not visible", page);
  await clickRadioByLabel("Manage stock?", "No", page);
  await clickRadioByLabel("Stock availability", "No", page);

  await selectCategory("Men", page);

  await clickButtonByLabel("Save", page);
  await verifyNotificationMessage("Product saved successfully!", page);
});

async function selectCategory(category: string, page: Page) {
  await page.getByRole('link', {name: "Select category"}).click();
  let categoryInput = page.getByPlaceholder('Search categories');
  await categoryInput.clear();
  await categoryInput.click();
  await categoryInput.fill(category);
  let xpath = `(//h3[normalize-space()="${category}"]/following::button[normalize-space()="Select"])[1]`;
  await page.locator(xpath).click();
}

async function uploadImage(filePath: string, page: Page) {
  let selector = "#images input";
  let absolutePath = path.join(process.cwd(), filePath);
  await page.locator(selector).setInputFiles(absolutePath);
}
