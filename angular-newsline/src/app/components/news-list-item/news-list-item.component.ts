import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NewsItemModel } from 'src/app/models/news-item.model';

@Component({
    selector: 'nl-news-list-item',
    templateUrl: './news-list-item.component.html',
    styleUrls: ['./news-list-item.component.scss']
})
export class NewsListItemComponent {
    @Input() model: NewsItemModel;
    @Input() searchWithin: string;
    @Output() editNews = new EventEmitter<string>();
    @Output() deleteNews = new EventEmitter<string>();

    editNewsClick(id: string) {
        this.editNews.emit(id);
    }

    deleteNewsClick(id: string) {
        this.deleteNews.emit(id);
    }
}
