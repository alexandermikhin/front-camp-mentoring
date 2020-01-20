import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { FilterModel } from 'src/app/models/filter.model';

@Component({
    selector: 'nl-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
    @Input() sources: string[];
    @Input() selectedSource: string;
    @Input() q: string;
    @Input() showLocalNews: boolean;
    @Output() addNewsItemClicked = new EventEmitter();
    @Output() filterApplied = new EventEmitter<FilterModel>();

    showLocalNewsChecked(showLocalNews: boolean) {
        this.filterApplied.emit({
            q: this.q,
            source: this.selectedSource,
            showLocalNews
        });
    }

    sourceSelected(value: string) {
        this.filterApplied.emit({
            q: this.q,
            source: value,
            showLocalNews: this.showLocalNews
        });
    }

    queryChanged(q: string) {
        this.filterApplied.emit({
            q,
            source: this.selectedSource,
            showLocalNews: this.showLocalNews
        });
    }

    addNewsItem() {
        this.addNewsItemClicked.emit();
    }
}
