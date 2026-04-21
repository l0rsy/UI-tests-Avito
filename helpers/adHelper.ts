import { APIRequestContext } from "@playwright/test";

export type CreateAdDto = {
    title: string;
    description: string;
    price?: number;
    category?: string;
};

export type AdResponse = {
    id: string;
    title: string;
    description: string;
    user_id: string;
    created_at: string;
};

/**
 * Создает объявление через API (для предусловий в тестах)
 * @param request - API контекст из фикстуры
 * @param adData - данные объявления (title, description, price?, category?)
 * @returns Promise с данными созданного объявления
 * 
 * @example
 * const ad = await createAdViaApi(api, {
 *   title: "Тестовое объявление",
 *   description: "Описание",
 *   price: 1000
 * });
 */
export async function createAdViaApi(
    request: APIRequestContext,
    adData: CreateAdDto
): Promise<AdResponse> {
    const response = await request.post("/api/v1/ads", {
        data: adData,
    });

    if (!response.ok()) {
        throw new Error(
            `Failed to create ad: ${response.status()}\n${await response.text()}`
        );
    }

    return await response.json() as AdResponse;
}

/**
 * Выполняет поиск объявлений через API
 * @param request - API контекст из фикстуры
 * @param query - поисковый запрос
 * @returns Promise с результатами поиска
 * 
 * @example
 * const results = await searchAdsViaApi(api, "телефон");
 */
export async function searchAdsViaApi(
    request: APIRequestContext,
    query: string
) {
    const response = await request.get(`/api/v1/ads/search?q=${encodeURIComponent(query)}`);
    
    if (!response.ok()) {
        throw new Error(
            `Failed to search ads: ${response.status()}\n${await response.text()}`
        );
    }

    return await response.json();
}
