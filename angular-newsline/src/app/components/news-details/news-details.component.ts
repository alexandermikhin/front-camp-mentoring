import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewsItemModel } from 'src/app/models/news-item.model';

@Component({
    selector: 'nl-news-details',
    templateUrl: './news-details.component.html',
    styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent {
    @Input() model: NewsItemModel | undefined;
    @Output() delete = new EventEmitter<string>();
    @Output() edit = new EventEmitter<string>();

    onDeleteClick() {
        this.delete.emit(this.model.id);
    }

    onEditClick() {
        this.edit.emit(this.model.id);
    }
}
