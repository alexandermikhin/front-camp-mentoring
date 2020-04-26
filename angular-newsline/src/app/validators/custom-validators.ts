import {
    AbstractControl,
    AsyncValidatorFn,
    ValidationErrors
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalNewsService } from '../services/localnews.service';

export class CustomValidators {
    static sourceUrl(localNewsService: LocalNewsService, newsId: string): AsyncValidatorFn {
        return (c: AbstractControl): Observable<ValidationErrors | null> => {
            if (!c.value) {
                return null;
            }

            return localNewsService.getNews({ sourceUrl: c.value }).pipe(
                map(items => {
                    return items || items.length ? null : { sourceUrl: true };
                })
            );
        };
    }
}
