import { Component } from '@angular/core';

@Component({
    selector: 'nl-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
    sources = [ 'All', 'BBC', 'CNN'];
}
