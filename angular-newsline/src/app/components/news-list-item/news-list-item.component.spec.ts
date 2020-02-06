import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NewsItemModel } from 'src/app/models';
import { HighlightPipe } from 'src/app/pipes';
import { NewsListItemComponent } from './news-list-item.component';

describe('NewsListItemComponent', () => {
    let component: NewsListItemComponent;
    let fixture: ComponentFixture<NewsListItemComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterModule],
            declarations: [NewsListItemComponent, HighlightPipe]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NewsListItemComponent);
        component = fixture.componentInstance;
    });

    it('should create component', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should emit news item id on edit news click', () => {
        spyOn(component.editNews, 'emit');
        component.model = {
            ...createModel(),
            isEditable: true
        };

        fixture.detectChanges();
        const editButtonDebugEl = fixture.debugElement.query(
            By.css('.nl-news-list-item-operations__button')
        );
        editButtonDebugEl.triggerEventHandler('click', null);
        expect(component.editNews.emit).toHaveBeenCalledWith('news-id');
    });

    it('should emit news item id on edit news click', () => {
        spyOn(component.deleteNews, 'emit');
        component.model = {
            ...createModel(),
            isEditable: true
        };

        fixture.detectChanges();
        const deleteButtonDebugEl = fixture.debugElement.queryAll(
            By.css('.nl-news-list-item-operations__button')
        );
        deleteButtonDebugEl[1].triggerEventHandler('click', null);
        expect(component.deleteNews.emit).toHaveBeenCalledWith('news-id');
    });

    it('should emit news item on expand news click', () => {
        spyOn(component.expandNews, 'emit');
        component.model = createModel();

        fixture.detectChanges();
        const expandButtonDebugEl = fixture.debugElement.query(
            By.css('.nl-button__expand')
        );
        expandButtonDebugEl.triggerEventHandler('click', null);
        expect(component.expandNews.emit).toHaveBeenCalledWith(component.model);
    });

    function createModel(): NewsItemModel {
        return {
            id: 'news-id',
            heading: 'news-heading',
            shortDescription: 'news-short-description',
            content: 'news-content',
            date: new Date('2020-06-02'),
            source: 'news-source'
        };
    }
});
