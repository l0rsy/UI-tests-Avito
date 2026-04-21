import { test, expect } from "../../fixtures/auth.fixture";
import { MainPage } from "../../pages/mainPage/mainPage";
import { LoginPopupPage } from "../../pages/loginPopupPage/loginPopupPage";
import { ProfilePage } from "../../pages/profilePage/profilePage";

test.describe("Вход существующего пользователя", () => {
    test("Доступны разделы \"Мои объявления\", \"Профиль и настройки\" и выход из аккаунта", async ({ page, auth }) => {
        // Arrange
        const mainPage = new MainPage(page);
        const loginPopup = new LoginPopupPage(page);
        const profilePage = new ProfilePage(page);
        
        const email = process.env.E2E_USER_EMAIL!;
        const password = process.env.E2E_USER_PASSWORD!;

        // Act - вход в систему
        await mainPage.openMainPage();
        await mainPage.openLoginDesktop();
        await loginPopup.login(email, password);

        // Assert - проверка успешного входа
        await mainPage.assertUserIsLoggedIn();

        // 1. Проверка доступа к разделу "Мои объявления"
        await mainPage.openMyAdsPage();
        await expect(page).toHaveURL(/.*\/my\/advertisements/);

        // 2. Проверка информации о пользователе в профиле
        await profilePage.goToProfileViaMenu(); // Переходим в профиль через меню
        const fullName = `${auth.user.first_name} ${auth.user.last_name}`;
        await profilePage.assertUserInfoIsDisplayed(auth.user.email, fullName);

        // 3. Проверка наличия кнопки выхода
        await profilePage.assertLogoutButtonExists();

        // 4. Выход из аккаунта
        await profilePage.logout();
        
        // 5. Проверка успешного выхода
        await expect(mainPage.mainloginButton).toBeVisible();
        await expect(mainPage.userMenuBtn).toBeHidden();
    });
});
