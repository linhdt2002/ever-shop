import { test, expect } from '@playwright/test';
import { data } from '../../../data/login-data';
import { ADMIN_PASSWORD, ADMIN_USERNAME, URL } from '../../../src/utils/constant-utils';
import path from "path";
import { CommonPage } from '../../../src/pages/common-page';
import { NewProductPage } from '../../../src/pages/new-product-page';

test.beforeEach("Navigate", async ({page})=> {
    await page.goto(URL);
});

test('Verify login successful', async ({ page }) => {
  let commonPage = new CommonPage(page);
  let newProductPage = new NewProductPage(page);

  await commonPage.inputTextboxByLabel("Email", ADMIN_USERNAME);
  await commonPage.inputTextboxByLabel("Password", ADMIN_PASSWORD);
  await commonPage.clickButtonByLabel("SIGN IN");

  //Verify user on Dashboard page
  let dashboardHeaderXpath = `//h1[contains(concat(" ", @class, " "), " page-heading-title ") and normalize-space()="Dashboard"]`;
  await expect(page.locator(dashboardHeaderXpath)).toBeVisible();
  await commonPage.clickMenuItemByLabel("New Product");

  //Verify user on New Product page
  let createANewProductXpath = `//h1[contains(concat(" ", @class, " "), " page-heading-title ") and normalize-space()="Create a new product"]`;
  await expect(page.locator(createANewProductXpath)).toBeVisible();

  //Input product's info
  const random = new Date().getTime();
  await commonPage.inputTextboxByLabel("Name", `Iphone ${random}`);
  await commonPage.inputTextboxByLabel("SKU", `SKU ${random}`);
  await commonPage.inputTextboxByLabel("Price", "1500");
  await commonPage.inputTextboxByLabel("Weight", "50");
  await commonPage.inputTextboxByLabel("Url key", `URL key ${random}`);
  await commonPage.inputTextboxByLabel("Meta title", "dlgjaelga");
  await commonPage.inputTextboxByLabel("Meta keywords", "dlgjaelga");
  await commonPage.inputTextboxByLabel("Meta description", "agaegaeg");
  await commonPage.inputTextboxByLabel("Quantity", "5");

  await commonPage.clickDropdownByLabel("Tax class", "Taxable Goods");
  await newProductPage.uploadImage("data/test.png");
  await commonPage.clickDropdownByLabel("Attribute group", "Default");
  await commonPage.clickDropdownByLabel("Color", "White");
  await commonPage.clickDropdownByLabel("Size", "XL");

  await commonPage.clickRadioByLabel("Status", "Disabled");
  await commonPage.clickRadioByLabel("Visibility", "Not visible");
  await commonPage.clickRadioByLabel("Manage stock?", "No");
  await commonPage.clickRadioByLabel("Stock availability", "No");

  await newProductPage.selectCategory("Men");

  await commonPage.clickButtonByLabel("Save");
  await commonPage.verifyNotificationMessage("Product saved successfully!");
});