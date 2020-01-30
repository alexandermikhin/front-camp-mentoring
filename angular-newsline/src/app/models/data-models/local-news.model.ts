export interface LocalNewsModel {
    id: number;
    heading: string;
    shortDescription: string;
    content: string;
    isFile: boolean;
    imageUrl: string;
    date: string;
    author: string;
    sourceUrl: string;
    useLocalImageUrl?: boolean;
}
