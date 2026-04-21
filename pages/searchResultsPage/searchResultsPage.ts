import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class SearchResultsPage extends BasePage {
    protected pageName = "Страница результатов поиска";
    
    readonly emptyStateTitle: Locator;
    readonly emptyStateMessage: Locator;
    readonly searchResultsList: Locator;

    constructor(page: Page) {
        super(page);
        
        // Локаторы с сайта
        this.emptyStateTitle = page.getByRole("heading", { name: "Ничего не найдено" });
        this.emptyStateMessage = page.getByText("Задайте запрос по-другому или установите более мягкие ограничения.");
        this.searchResultsList = page.locator("[data-marker=\"search-results\"]");
    }

    protected root(): Locator {
        return this.emptyStateTitle;
    }

    /**
     * Проверяет отображение сообщения об отсутствии результатов
     */
    async assertEmptyStateIsVisible() {
        await expect(
            this.emptyStateTitle,
            "Заголовок 'Ничего не найдено' не отображается"
        ).toBeVisible();
        
        await expect(
            this.emptyStateMessage,
            "Сообщение об отсутствии результатов не отображается"
        ).toBeVisible();
    }

    /**
     * Проверяет текст заглушки при отсутствии результатов
     */
    async assertEmptyStateText() {
        await expect(this.emptyStateTitle).toHaveText("Ничего не найдено");
        await expect(this.emptyStateMessage).toHaveText(
            "Задайте запрос по-другому или установите более мягкие ограничения."
        );
    }

    /**
     * Проверяет, что объявление найдено в поиске
     * @param title - заголовок объявления
     * @param description - описание объявления
     */
    async assertAdIsFoundInSearch(title: string, description: string): Promise<void> {
        // Проверяем, что заголовок объявления виден на странице
        const titleElement = this.page.getByText(title).first();
        await expect(titleElement, `Заголовок "${title}" не найден на странице`).toBeVisible();
        
        // Проверяем, что описание объявления видно на странице
        const descriptionElement = this.page.getByText(description).first();
        await expect(descriptionElement, `Описание "${description}" не найдено на странице`).toBeVisible();
        
        // Проверяем изображение (ищем по alt-тексту, содержащему заголовок)
        const imageElement = this.page.locator(`img[alt*="${title}"]`).first();
        await expect(imageElement, `Изображение для "${title}" не найдено`).toBeVisible();
    }
}
