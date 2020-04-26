import { InjectionToken } from '@angular/core';

export interface NewsApiConfig {
    apiKey: string;
    apiUrl: string;
}

const newsApiConfig: NewsApiConfig = {
    apiKey: 'D7d93d013b914df292f2f135562b7514',
    apiUrl: 'https://newsapi.org/v2'
};

export const NewsApiInjectionToken = new InjectionToken<NewsApiConfig>(
    'NewsApiInjectionToken'
);

export const NewsApiConfigProvider = {
    provide: NewsApiInjectionToken,
    useValue: newsApiConfig
};
