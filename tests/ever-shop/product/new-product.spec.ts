import { test, expect } from '@playwright/test';
import { data } from '../../../data/login-data';
import { ADMIN_PASSWORD, ADMIN_USERNAME, URL } from '../../../src/utils/constant-utils';
import path from "path";
import { NewProductPage } from '../../../src/pages/new-product-page';
import { LoginPage } from '../../../src/pages/login-page';
import { DashboardPage } from '../../../src/pages/dashboard-page';

let newProductPage: NewProductPage;
let loginPage: LoginPage;
let dashboardPage: DashboardPage;

test.beforeEach("Navigate", async ({page})=> {
    await page.goto(URL);
    newProductPage = new NewProductPage(page);
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
});

test('Verify login successful', async ({ page }) => {
  await loginPage.inputTextboxByLabel("Email", ADMIN_USERNAME);
  await loginPage.inputTextboxByLabel("Password", ADMIN_PASSWORD);
  await loginPage.clickButtonByLabel("SIGN IN");

  //Verify user on Dashboard page
  await dashboardPage.isOnPage();

  await dashboardPage.clickMenuItemByLabel("New Product");

  //Verify user on New Product page
  await newProductPage.isOnPage();

  //Input product's info
  const random = new Date().getTime();
  await newProductPage.inputTextboxByLabel("Name", `Iphone ${random}`);
  await newProductPage.inputTextboxByLabel("SKU", `SKU ${random}`);
  await newProductPage.inputTextboxByLabel("Price", "1500");
  await newProductPage.inputTextboxByLabel("Weight", "50");
  await newProductPage.inputTextboxByLabel("Url key", `URL key ${random}`);
  await newProductPage.inputTextboxByLabel("Meta title", "dlgjaelga");
  await newProductPage.inputTextboxByLabel("Meta keywords", "dlgjaelga");
  await newProductPage.inputTextboxByLabel("Meta description", "agaegaeg");
  await newProductPage.inputTextboxByLabel("Quantity", "5");

  await newProductPage.clickDropdownByLabel("Tax class", "Taxable Goods");
  await newProductPage.uploadImage("data/test.png");
  await newProductPage.clickDropdownByLabel("Attribute group", "Default");
  await newProductPage.clickDropdownByLabel("Color", "White");
  await newProductPage.clickDropdownByLabel("Size", "XL");

  await newProductPage.clickRadioByLabel("Status", "Disabled");
  await newProductPage.clickRadioByLabel("Visibility", "Not visible");
  await newProductPage.clickRadioByLabel("Manage stock?", "No");
  await newProductPage.clickRadioByLabel("Stock availability", "No");

  await newProductPage.selectCategory("Men");

  await newProductPage.clickButtonByLabel("Save");
  await newProductPage.verifyNotificationMessage("Product saved successfully!");
});