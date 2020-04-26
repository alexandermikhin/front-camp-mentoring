import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
    transform(innerText: string, phrase: string) {
        if (!innerText || !phrase) {
            return innerText;
        }

        const exp = new RegExp(phrase, 'gi');

        return innerText.replace(
            exp,
            `<span class="highlight">$&</span>`
        );
    }
}
