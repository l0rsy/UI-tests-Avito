import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class CreateAdPage extends BasePage {
    protected pageName = "Страница создания объявления";
    
    readonly titleInput: Locator;
    readonly descriptionInput: Locator;
    readonly addPhotoButton: Locator;
    readonly publishButton: Locator;
    readonly photoPreview: Locator;

    constructor(page: Page) {
        super(page);
        
        this.titleInput = page.locator("[data-marker=\"title-input\"]");
        this.descriptionInput = page.locator("[data-marker=\"description-input\"]");
        this.addPhotoButton = page.locator("[data-marker=\"add-photo-button\"]");
        this.publishButton = page.locator("[data-marker=\"submit-button\"]");
        this.photoPreview = page.locator("[data-marker^=\"new-photo-preview-\"]");
    }

    protected root(): Locator {
        return this.titleInput;
    }

    /**
     * Открывает страницу создания объявления
     */
    async openCreateAdPage() {
        await this.page.goto("/advertisements/create");
        await this.waitForOpen();
    }

    /**
     * Заполняет обязательные поля формы
     * @param title - название объявления
     * @param description - описание объявления
     */
    async fillRequiredFields(title: string, description: string) {
        await this.fill(this.titleInput, title);
        await this.fill(this.descriptionInput, description);
    }

    /**
     * Загружает фото для объявления
     * @param photoPath - путь к файлу с фото
     */
    async uploadPhoto(photoPath: string) {
        // Для загрузки файла используем setInputFiles
        const fileInput = this.page.locator("input[type=\"file\"]");
        await fileInput.setInputFiles(photoPath);
        await expect(this.photoPreview).toBeVisible();
    }

    /**
     * Публикует объявление
     */
    async publishAd() {
        await this.click(this.publishButton);
    }

    /**
     * Создает объявление со всеми обязательными полями
     * @param title - название объявления
     * @param description - описание объявления
     * @param photoPath - путь к файлу с фото
     */
    async createAd(title: string, description: string, photoPath: string) {
        await this.fillRequiredFields(title, description);
        await this.uploadPhoto(photoPath);
        await this.publishAd();
    }
}
