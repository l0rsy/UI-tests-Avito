import { Locator, Page, expect } from "@playwright/test";
import {BasePage} from "../basePage";

export class MainPage extends BasePage {
    protected pageName = "Главная страница";

    readonly header: Locator;
    readonly mobileMenuButton: Locator;
    readonly loginButtonDesktop: Locator;
    readonly loginButtonMobile: Locator;
    readonly myAdsBtn: Locator;
    readonly userMenuBtn: Locator;
    readonly loginModal: Locator;
    // Новые локаторы
    readonly searchInput: Locator;
    readonly createAdButton: Locator;
    readonly mainloginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.header = page.locator("header");
        this.mobileMenuButton = page.locator("[data-marker=\"mobile-menu-button\"]");
        this.loginButtonDesktop = page.locator("[data-marker=\"login-button-desktop\"]");
        this.loginButtonMobile = page.locator("[data-marker=\"login-button-mobile\"]");
        this.myAdsBtn = page.locator("[data-marker=\"my-ads-link\"]");
        this.userMenuBtn = page.locator("[data-marker=\"user-menu-button\"]");
        this.loginModal = page.locator("[data-marker=\"login-modal-content\"]");
        // Новые локаторы
        this.searchInput = page.locator("[data-marker=\"search-input\"]");
        this.createAdButton = page.locator("[data-marker=\"create-ad-button-desktop\"]");
        this.mainloginButton  = page.locator("[data-marker=\"login-submit-button\"]");
    }

    protected root(): Locator {
        return this.header;
    }

    async openMainPage() {
        await this.page.goto("/");
        await this.waitForOpen();
    }

    async openMyAdsPage() {
        await this.myAdsBtn.click();
    }

    async openLoginDesktop() {
        await this.loginButtonDesktop.click();
    }
    async openLoginMobile() {
        await this.loginButtonMobile.click();
    }

    async assertUserIsLoggedIn() {
        await expect(
            this.userMenuBtn,
            "Пользователь не авторизован")
            .toBeVisible();
    }

    // Новые методы

    /**
     * Выполняет поиск по указанному запросу
     * @param query - поисковый запрос
     */
    async search(query: string) {
        await this.fill(this.searchInput, query);
        await this.page.keyboard.press("Enter");
    }

    /**
     * Открывает форму создания объявления
     */
    async openCreateAdForm() {
        await this.click(this.createAdButton);
    }
}
