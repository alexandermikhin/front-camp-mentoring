import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
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
});
