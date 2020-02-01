import { LocalNewsModel, NewsApiArticleModel, NewsItemModel } from '../models';

export function getNewsItemModel(article: NewsApiArticleModel): NewsItemModel {
    return {
        content: article.content,
        date: new Date(article.publishedAt),
        heading: article.title,
        id: '',
        shortDescription: article.description || '',
        sourceUrl: article.url,
        source: article.source && article.source.name,
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
        image: article.useImageData ? article.imageData : article.imageUrl,
        source: '',
        author: article.author,
        isLocalNews: true
    };
}
