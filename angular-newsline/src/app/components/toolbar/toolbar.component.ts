import {
    Component,
    EventEmitter,
    Input,
    Output,
    OnChanges
} from '@angular/core';
import { FilterModel } from 'src/app/models/filter.model';
import { SourceModel } from 'src/app/models/view-models/source.model';

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
    @Output() addNewsItemClicked = new EventEmitter();
    @Output() filterApplied = new EventEmitter<FilterModel>();

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
}
