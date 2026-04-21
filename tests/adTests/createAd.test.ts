import { test } from "../../fixtures/auth.fixture";
import { MainPage } from "../../pages/mainPage/mainPage";
import { CreateAdPage } from "../../pages/createAdPage/createAdPage";
import { MyAdsPage } from "../../pages/myAdsPage/myAdsPage";
import { SearchResultsPage } from "../../pages/searchResultsPage/searchResultsPage";
import * as path from "path";

test.describe("Создание объявления со всеми обязательными полями", () => {
    test("Отображаются все данные и само объявление в поиске", async ({authedPage}) => {
        // Arrange
        const mainPage = new MainPage(authedPage);
        const createAdPage = new CreateAdPage(authedPage);
        const myAdsPage = new MyAdsPage(authedPage);
        const searchResultsPage = new SearchResultsPage(authedPage);
        
        const adTitle = `Тестовое объявление ${Date.now()}`;
        const adDescription = "Это описание тестового объявления";
        const photoPath = path.join(__dirname, "../../test-data/test-photo.jpg");

        // Act - создание объявления
        await mainPage.openMainPage();
        await mainPage.openCreateAdForm();
        await createAdPage.createAd(adTitle, adDescription, photoPath);

        // Assert - проверка в "Мои объявления"
        await mainPage.openMyAdsPage();
        await myAdsPage.waitForOpen();
        await myAdsPage.assertAdIsDisplayedInMyAds(adTitle, adDescription);

        // Assert - проверка в поиске
        await mainPage.openMainPage();
        await mainPage.search(adTitle);
        await searchResultsPage.assertAdIsFoundInSearch(adTitle, adDescription);
    });
});
