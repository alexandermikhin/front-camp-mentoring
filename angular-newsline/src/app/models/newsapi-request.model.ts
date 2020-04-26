export interface NewsApiRequestModel {
    apiKey: string;
    country?: string;
    category?: string;
    sources?: string;
    q?: string;
    pageSize?: number;
    page?: number;
}
