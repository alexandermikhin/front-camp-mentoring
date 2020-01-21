import {
    Component,
    EventEmitter,
    Input,
    Output,
    OnChanges
} from '@angular/core';
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
    @Input() userNewsOnly: boolean;
    @Input() canAddNews: boolean;
    @Output() addNewsItemClicked = new EventEmitter();
    @Output() filterApplied = new EventEmitter<FilterModel>();

    userNewsOnlyChecked(userNewsOnly: boolean) {
        this.filterApplied.emit({
            q: this.q,
            source: this.selectedSource,
            userNewsOnly
        });
    }

    sourceSelected(value: string) {
        this.filterApplied.emit({
            q: this.q,
            source: value,
            userNewsOnly: this.userNewsOnly
        });
    }

    queryChanged(q: string) {
        this.filterApplied.emit({
            q,
            source: this.selectedSource,
            userNewsOnly: this.userNewsOnly
        });
    }

    addNewsItem() {
        this.addNewsItemClicked.emit();
    }
}
