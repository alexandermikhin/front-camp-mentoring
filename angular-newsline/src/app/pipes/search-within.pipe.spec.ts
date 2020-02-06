import { NewsItemModel } from '../models';
import { SearchWithinPipe } from './search-within.pipe';

describe('SearchWithinPipe', () => {
    let pipe: SearchWithinPipe;

    beforeEach(() => {
        pipe = new SearchWithinPipe();
    });

    it('should return items which contain phrase in heading', () => {
        const items: NewsItemModel[] = [
            createNewsItemModel(0, 'Heading', ''),
            createNewsItemModel(1, 'Title', ''),
            createNewsItemModel(2, 'heading', ''),
            createNewsItemModel(3, 'HEADING', ''),
            createNewsItemModel(4, 'hEADING', '')
        ];

        const expectedIds: string[] = [getId(0), getId(2), getId(3), getId(4)];

        const result = pipe.transform(items, 'head');
        const resultIds = result.map(i => i.id);
        expect(resultIds).toEqual(expectedIds);
    });

    it('should return items which contain phrase in short description', () => {
        const items: NewsItemModel[] = [
            createNewsItemModel(0, '', 'Description'),
            createNewsItemModel(1, '', 'Content'),
            createNewsItemModel(2, '', 'description'),
            createNewsItemModel(3, '', 'DESCRIPTION'),
            createNewsItemModel(4, '', 'dESCRIPTION')
        ];

        const expectedIds: string[] = [getId(0), getId(2), getId(3), getId(4)];

        const result = pipe.transform(items, 'desc');
        const resultIds = result.map(i => i.id);
        expect(resultIds).toEqual(expectedIds);
    });

    it('should return items if there is no phrase', () => {
        const items: NewsItemModel[] = [
            createNewsItemModel(0, '1', '1'),
            createNewsItemModel(1, '2', '2'),
            createNewsItemModel(2, '3', '3'),
            createNewsItemModel(3, '4', '4'),
            createNewsItemModel(4, '5', '5')
        ];

        const expectedIds: string[] = [
            getId(0),
            getId(1),
            getId(2),
            getId(3),
            getId(4)
        ];

        const result = pipe.transform(items, '');
        const resultIds = result.map(i => i.id);
        expect(resultIds).toEqual(expectedIds);
    });

    function createNewsItemModel(
        n: number,
        heading: string,
        shortDescription: string
    ): NewsItemModel {
        return {
            id: getId(n),
            heading,
            shortDescription,
            content: `news-item-${n}-content`,
            date: new Date('2020-02-06'),
            source: `news-item-${n}-source`
        };
    }

    function getId(n: number): string {
        return `news-item-${n}-id`;
    }
});
