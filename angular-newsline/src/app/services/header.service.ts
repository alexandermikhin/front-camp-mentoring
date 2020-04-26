import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class HeaderService {
    private header = new Subject<string>();

    get activeHeader(): Observable<string> {
        return this.header.asObservable();
    }

    setHeader(value: string) {
        this.header.next(value);
    }
}
