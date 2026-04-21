import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class ProfilePage extends BasePage {
    protected pageName = "Страница профиля";
    
    // Локаторы
    readonly userMenuButton: Locator; // Кнопка открытия подменю
    readonly userMenuModal: Locator; // Выпадающее подменю
    readonly logoutButton: Locator; // Кнопка "Выход" (находится в подменю)
    readonly myAdsLink: Locator; // Кнопка "Мои объявления"
    readonly profileLink: Locator;
    readonly profileContainer: Locator;
    
    constructor(page: Page) {
        super(page);
        
        // Основные локаторы
        this.userMenuButton = page.locator("[data-marker=\"user-menu-button\"]");
        this.myAdsLink = page.locator("[data-marker=\"my-ads-link\"]");
        
        // Элементы выпадающего меню
        this.userMenuModal = page.locator("div.absolute.right-0.mt-2.w-56.rounded-md.border.bg-white.shadow-lg");
        this.profileLink = page.locator("[data-marker=\"profile-link\"]");
        this.logoutButton = page.locator("[data-marker=\"logout-button\"]");
        
        // Контейнер профиля
        this.profileContainer = page.locator("[data-marker=\"profile\"], .profile");
    }

    protected root(): Locator {
        return this.profileContainer.or(this.page.getByRole("heading").first());
    }

    async waitForOpen() {
        await this.waitForUrl(/.*\/profile.*/);
        await expect(this.profileContainer.or(this.page.getByRole("heading").first())).toBeVisible();
    }

    /**
     * Открывает выпадающее меню пользователя
     */
    async openUserMenu() {
        await this.userMenuButton.click();
        await expect(this.userMenuModal).toBeVisible();
        await expect(this.logoutButton).toBeVisible(); 
    }

    /**
     * Закрывает выпадающее меню (кликом по кнопке меню)
     */
    async closeUserMenu() {
        await this.userMenuButton.click();
        await expect(this.userMenuModal).toBeHidden();
    }

    /**
     * Переходит в профиль через меню пользователя
     */
    async goToProfileViaMenu() {
        await this.openUserMenu();
        await this.profileLink.click();
        await this.waitForOpen();
    }

    /**
     * Проверяет, что в профиле отображается информация о пользователе
     */
    async assertUserInfoIsDisplayed(email: string, name: string) {
        // Проверяем имя пользователя (заголовок)
        const userNameElement = this.page.getByRole("heading").filter({ hasText: name });
        await expect(userNameElement.first()).toBeVisible();
        
        // Проверяем email
        const userEmailElement = this.page.getByText(email);
        await expect(userEmailElement.first()).toBeVisible();
    }

    /**
     * Проверяет наличие кнопки выхода в меню
     */
    async assertLogoutButtonExists() {
        await this.openUserMenu();
        await expect(this.logoutButton).toBeVisible();
        await this.closeUserMenu();
    }

    /**
     * Выполняет выход из аккаунта
     */
    async logout() {
        await this.openUserMenu();
        await this.logoutButton.click();
        await expect(this.page).toHaveURL(/.*\/?$/);
    }
}
