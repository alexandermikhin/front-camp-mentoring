import { LocalNewsModel } from '../models/data-models/local-news.model';
import { NewsItemModel } from '../models/news-item.model';
import { NewsApiArticleModel } from '../models/newsapi-response.model';

export function getNewsItemModel(article: NewsApiArticleModel): NewsItemModel {
    return {
        content: article.content,
        date: new Date(article.publishedAt),
        heading: article.title,
        id: '',
        shortDescription: article.description || '',
        source: article.url,
        image: article.urlToImage
    };
}

export function getNewsItemFromLocal(article: LocalNewsModel): NewsItemModel {
    return {
        id: article.id.toString(),
        date: new Date(article.date),
        heading: article.heading,
        content: article.content,
        shortDescription: article.shortDescription,
        sourceUrl: article.sourceUrl,
        image: article.imageUrl,
        source: '',
        author: article.author,
        useLocalImageUrl: article.useLocalImageUrl
    };
}
