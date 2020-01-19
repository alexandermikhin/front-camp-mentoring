import { Component } from '@angular/core';

@Component({
    selector: 'nl-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    login = '';
    sourceName = 'Source name';
}
