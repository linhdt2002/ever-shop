import { Page } from "@playwright/test";
import path from "path";

export class NewProductPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async selectCategory(category: string) {
        await this.page.getByRole('link', {name: "Select category"}).click();
        let categoryInput = this.page.getByPlaceholder('Search categories');
        await categoryInput.clear();
        await categoryInput.click();
        await categoryInput.fill(category);
        let xpath = `(//h3[normalize-space()="${category}"]/following::button[normalize-space()="Select"])[1]`;
        await this.page.locator(xpath).click();
    }

    async uploadImage(filePath: string) {
        let selector = "#images input";
        let absolutePath = path.join(process.cwd(), filePath);
        await this.page.locator(selector).setInputFiles(absolutePath);
    }
}