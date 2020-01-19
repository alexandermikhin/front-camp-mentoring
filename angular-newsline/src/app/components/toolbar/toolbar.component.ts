import { Component } from '@angular/core';

@Component({
    selector: 'nl-toolbar',
    templateUrl: './toolbar.component.html'
})
export class ToolbarComponent {
    sources = [ 'All', 'BBC', 'CNN'];
}
