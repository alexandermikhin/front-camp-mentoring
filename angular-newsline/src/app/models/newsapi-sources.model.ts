export interface NewsApiSourcesModel {
    status: string;
    sources: NewsApiSourceModel[];
}

export interface NewsApiSourceModel {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}
