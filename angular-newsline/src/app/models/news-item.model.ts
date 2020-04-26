export interface NewsItemModel {
    id: string;
    heading: string;
    shortDescription: string;
    content: string;
    date: Date;
    source: string;
    image?: string;
    author?: string;
    sourceUrl?: string;
    isEditable?: boolean;
    isLocalNews?: boolean;
}
