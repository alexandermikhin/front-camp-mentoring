export interface NewsApiResponseModel {
    status: string;
    totalResults: number;
    articles: NewsApiArticleModel[];
}

export interface NewsApiArticleModel {
    source: { id: string | null; name: string };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}
