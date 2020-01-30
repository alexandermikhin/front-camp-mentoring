export interface NewsItemModel {
    id: string;
    heading: string;
    shortDescription: string;
    content: string;
    date: Date;
    source: string;
    image?: string;
    useLocalImageUrl?: boolean;
    author?: string;
    sourceUrl?: string;
    isEditable?: boolean;
    localUrl?: string;
}
