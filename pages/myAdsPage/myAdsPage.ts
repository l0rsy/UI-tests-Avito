import { Locator, Page, expect } from "@playwright/test";
import {BasePage} from "../basePage";

export class MyAdsPage extends BasePage {
    protected pageName = "Мои объявления";

    readonly emptyStateTitle: Locator;
    readonly myAdsTitle: Locator;
    readonly adsList: Locator;

    constructor(page: Page) {
        super(page);
        this.myAdsTitle = page.locator("[data-marker=\"my-ads-title\"]");
        this.emptyStateTitle = page.locator("[data-marker=\"empty-state-title\"]");
        this.adsList = page.locator("[data-marker=\"my-ads-grid\"]");
    }

    protected root(): Locator {
        return this.myAdsTitle;
    }

    async assertEmptyStateTitleIsVisible() {
        await expect(
            this.emptyStateTitle,
            "Заголовок заглушки отсутствия объявлений не отображается")
            .toBeVisible();
    }

    /**
     * Проверяет, что объявление отображается в списке "Мои объявления"
     * @param title - заголовок объявления
     * @param description - описание объявления
     */
    async assertAdIsDisplayedInMyAds(title: string, description: string): Promise<void> {
        // Ждем загрузки списка объявлений
        await expect(this.adsList).toBeVisible();
        
        // Проверяем, что заголовок объявления виден на странице
        const titleElement = this.page.getByText(title).first();
        await expect(titleElement, `Заголовок "${title}" не найден в Моих объявлениях`).toBeVisible();
        
        // Проверяем, что описание объявления видно на странице
        const descriptionElement = this.page.getByText(description).first();
        await expect(descriptionElement, `Описание "${description}" не найдено в Моих объявлениях`).toBeVisible();
        
        // Проверяем изображение (ищем по alt-тексту, содержащему заголовок)
        const imageElement = this.page.locator(`img[alt*="${title}"]`).first();
        await expect(imageElement, `Изображение для "${title}" не найдено в Моих объявлениях`).toBeVisible();
    }
}
