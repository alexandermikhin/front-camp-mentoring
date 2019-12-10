export class Subject {
    constructor() {
        this.observers = [];
        
    }

    setValue(value) {
        this.value = value;
        this._notifiyObservers();
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    unsubscribe() {
        this.observers = [];
    }

    _notifiyObservers() {
        for (const observer of this.observers) {
            observer(this.value);
        }
    }
}