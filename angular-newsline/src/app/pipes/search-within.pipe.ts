import { Pipe, PipeTransform } from '@angular/core';
import { NewsItemModel } from '../models/news-item.model';

@Pipe({
    name: 'searchWithin'
})
export class SearchWithinPipe implements PipeTransform {
    transform(
        items: NewsItemModel[] | undefined,
        phrase: string | undefined
    ): NewsItemModel[] | undefined {
        if (!items || !phrase) {
            return items;
        }

        return items.filter(
            item =>
                this.includes(item.heading, phrase) ||
                this.includes(item.shortDescription, phrase)
        );
    }

    private includes(source: string, phrase: string): boolean {
        return source.toLowerCase().includes(phrase.toLowerCase());
    }
}
