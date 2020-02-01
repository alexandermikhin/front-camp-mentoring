export interface LocalNewsModel {
    id: number;
    heading: string;
    shortDescription: string;
    content: string;
    date: string;
    author: string;
    sourceUrl: string;
    imageUrl?: string;
    imageData?: string;
    useImageData?: boolean;
}
