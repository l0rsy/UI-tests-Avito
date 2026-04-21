[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/wLTbuhGu)
# testboard-e2e-tests

E2E тесты на Playwright для Testboard.

### Требования

- Node.js 18+ (лучше LTS)
- npm 9+

### Установка

1) Установить зависимости:

```bash
npm install
```
Удостовериться, что устанвоились браузеры
```bash
npx playwright install
```

### Использование вечного пользователя в тестах

Тесты логинятся в существующий аккаунт через ручку и прокидывают авторизацию в localStorage.

Для использования СВОЕГО пользователя нужно ввести его данные в файле .env

```bash
USER_EMAIL=email
USER_PASSWORD=password
```

### Запуск тестов

Запустить все тесты:

```bash
npx playwright test
```

Запустить конкретный тестовый файл reateAccount.test.ts:
```bash
npx playwright test tests/accountTests/createAccount.test.ts
```

Запустить конкретный тест по названию:
```bash
npx playwright test -g "Открытие страницы Мои объявления"
```
Запустить тест по группе:
```bash
npx playwright test tests/authTests
```

## Линтер (ESLint)

#### Проверить проект линтером:
```bash
npx eslint . 
```
Пустота означает, что ошибок нет
#### Запустить линтер для конкретного файла:
```bash
npx eslint fixtures/auth.fixture.ts --fix
```
#### Запустить линтер для всего проекта:
```bash
npx eslint . --fix
```
Если какие-то ошибки останутся, их нужно будет подправить руками
