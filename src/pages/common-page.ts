import { expect, Page, request } from "@playwright/test";
import { API_URL } from "../utils/constant-utils";

export class CommonPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async inputTextboxByLabel(label: string, input: string) {
        let xpathTextBox = `(//label[contains(normalize-space(), "${label}")]/following::input)[1]`;
        let xpathTextArea = `(//label[contains(normalize-space(), "${label}")]/following::textarea)[1]`;
        let inputLocator = this.page.locator(`${xpathTextArea} | ${xpathTextBox}`).first();
        await inputLocator.click();
        await inputLocator.clear();
        await inputLocator.fill(input);
    }
    
    async clickButtonByLabel(label: string) {
        let xpath = `//*[(@role='button' or self::button or self::input) 
        and (normalize-space()='${label}' or @value='${label}')] `;
    
        await this.page.locator(xpath).click();
    }
    
    async verifyFieldErrorMessageByLabel(label: string, errorMessage: string) {
        let xpath = `//label[contains(normalize-space(), "${label}")]/following::div[normalize-space()="${errorMessage}"]`;
        await expect(this.page.locator(xpath)).toBeVisible();
    }
    
    async clickMenuItemByLabel(label: string) {
        let xpath = `//div[contains(concat(" ", @class, " "), " admin-nav ")]//a[normalize-space()="${label}"]`;
        await this.page.locator(xpath).click();
    }
    
    async clickDropdownByLabel(label: string, item: string) {
        let xpath = `(//*[normalize-space()="${label}"]/following::select)[1]`;
        await this.page.locator(xpath).selectOption({label: item});
    }
    
    async clickRadioByLabel(label: string, item: string) {
        let xpath = `(//label[normalize-space()='${label}']/following::label[.//input[@type='radio'] and normalize-space()='${item}'])[1]`;
        await this.page.locator(xpath).click();
    }
    
    async verifyNotificationMessage(message: string) {
        await expect(this.page.getByText(message));
    }

    async getTextBoxValueByLabel(label: string) {
        let xpathTextBox = `(//label[contains(normalize-space(), "${label}")]/following::input)[1]`;
        let xpathTextArea = `(//label[contains(normalize-space(), "${label}")]/following::textarea)[1]`;
        let inputLocator = this.page.locator(`${xpathTextArea} | ${xpathTextBox}`).first();
        return inputLocator.inputValue();
    }

    async getCookies() {
        let cookies = await this.page.context().cookies();
        let asid = cookies.find(obj => obj.name == 'asid');
        let sid = cookies.find(obj => obj.name == "sid");
        return `sid=${sid?.value};asid=${asid?.value}`;
    }

    async deleteProductById(cookie: string, productId: string) {
        let req = await request.newContext()
        await req.delete(`${API_URL}/api/products/${productId}`, {
            headers: {
                cookie: cookie
            }
        })    
    }
}