import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterModel, SourceModel } from 'src/app/models';

@Component({
    selector: 'nl-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
    @Input() sources: SourceModel[];
    @Input() selectedSourceId: string;
    @Input() q: string;
    @Input() userNewsOnly: boolean;
    @Input() canAddNews: boolean;
    @Input() searchWithin: string;
    @Output() addNewsItemClicked = new EventEmitter();
    @Output() filterApplied = new EventEmitter<FilterModel>();
    @Output() searchWithinApplied = new EventEmitter<string>();

    userNewsOnlyChecked(userNewsOnly: boolean) {
        this.filterApplied.emit({
            q: this.q,
            sourceId: this.selectedSourceId,
            userNewsOnly
        });
    }

    sourceSelected(value: string) {
        this.filterApplied.emit({
            q: this.q,
            sourceId: value,
            userNewsOnly: this.userNewsOnly
        });
    }

    queryChanged(q: string) {
        this.filterApplied.emit({
            q,
            sourceId: this.selectedSourceId,
            userNewsOnly: this.userNewsOnly
        });
    }

    addNewsItem() {
        this.addNewsItemClicked.emit();
    }

    searchWithinChanged(value: string) {
        this.searchWithinApplied.emit(value);
    }
}
