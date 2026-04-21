import { test} from "@playwright/test";
import { MainPage } from "../../pages/mainPage/mainPage";
import { SearchResultsPage } from "../../pages/searchResultsPage/searchResultsPage";

test.describe("Поиск несуществующего объявления", () => {
    test("Должна показываться заглушка \"Ничего не найдено\"", async ({ page }) => {
        /**
         * Тест проверяет, что при поиске несуществующего объявления
         * отображается корректная заглушка
         */
        
        // Arrange - подготовка данных
        const mainPage = new MainPage(page);
        const searchResultsPage = new SearchResultsPage(page);
        const searchQuery = "абвгд 123"; // Заведомо несуществующее объявление

        // Act - выполнение действий
        await mainPage.openMainPage();
        await mainPage.search(searchQuery);

        // Assert - проверка результатов
        await searchResultsPage.assertEmptyStateIsVisible();
        await searchResultsPage.assertEmptyStateText();
    });
});
