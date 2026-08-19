import { test, expect } from '@playwright/test';
import { ADMIN_PASSWORD, ADMIN_USERNAME, API_URL, URL } from '../../../src/utils/constant-utils';
import { NewProductPage } from '../../../src/pages/new-product-page';
import { LoginPage } from '../../../src/pages/login-page';
import { DashboardPage } from '../../../src/pages/dashboard-page';
import { ProductsPage } from '../../../src/pages/products-page';
import { EditProductPage } from '../../../src/pages/edit-product-page';

let newProductPage: NewProductPage;
let loginPage: LoginPage;
let dashboardPage: DashboardPage;
let productsPage: ProductsPage;
let editProductPage: EditProductPage;
let cookie: string;
let productIds: string[] = [];

test.beforeEach("Navigate", async ({page})=> {
    await page.goto(URL);
    newProductPage = new NewProductPage(page);
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    productsPage = new ProductsPage(page);
    editProductPage = new EditProductPage(page);
    loginPage.login(ADMIN_USERNAME, ADMIN_PASSWORD);
    cookie = await editProductPage.getCookies();
});

test('Verify login successful - case 1', async ({ page, request }) => {
  //Verify user on Dashboard page
  await dashboardPage.isOnPage();

  await dashboardPage.clickMenuItemByLabel("New Product");

  //Verify user on New Product page
  await newProductPage.isOnPage();

  //Input product's info
  const random = new Date().getTime();
  let productName = `Iphone ${random}`;
  await newProductPage.inputTextboxByLabel("Name", productName);
  await newProductPage.inputTextboxByLabel("SKU", `SKU ${random}`);
  await newProductPage.inputTextboxByLabel("Price", "1500");
  await newProductPage.inputTextboxByLabel("Weight", "50");
  await newProductPage.inputTextboxByLabel("Url key", `URLkey${random}`);
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

  await newProductPage.clickMenuItemByLabel("Products");
  await productsPage.isOnPage();
  await productsPage.searchProduct(productName);
  await productsPage.selectProductByName(productName);
  await editProductPage.isOnPage(productName);
  await expect(await editProductPage.getTextBoxValueByLabel('Name')).toEqual(productName);
  let productId = editProductPage.getProductIdFromUrl();
  productIds.push(productId);
});


test('Verify login successful - case 2', async ({ page, request }) => {
  //Verify user on Dashboard page
  await dashboardPage.isOnPage();

  await dashboardPage.clickMenuItemByLabel("New Product");

  //Verify user on New Product page
  await newProductPage.isOnPage();

  //Input product's info
  const random = new Date().getTime();
  let productName = `Iphone ${random}`;
  await newProductPage.inputTextboxByLabel("Name", productName);
  await newProductPage.inputTextboxByLabel("SKU", `SKU ${random}`);
  await newProductPage.inputTextboxByLabel("Price", "1500");
  await newProductPage.inputTextboxByLabel("Weight", "50");
  await newProductPage.inputTextboxByLabel("Url key", `URLkey${random}`);
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

  await newProductPage.clickMenuItemByLabel("Products");
  await productsPage.isOnPage();
  await productsPage.searchProduct(productName);
  await productsPage.selectProductByName(productName);
  await editProductPage.isOnPage(productName);
  let productId = editProductPage.getProductIdFromUrl();
  productIds.push(productId);
});

test.afterAll(async () => {
  for (let id of productIds) {
    await editProductPage.deleteProductById(cookie, id);
  }
});