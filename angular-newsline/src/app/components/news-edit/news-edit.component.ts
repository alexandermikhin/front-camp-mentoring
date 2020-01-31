import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { LocalNewsModel } from 'src/app/models/data-models/local-news.model';
import { User } from 'src/app/models/user.model';
import { HeaderService } from 'src/app/services/header.service';
import { LocalNewsService } from 'src/app/services/localnews.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'nl-news-edit',
    templateUrl: './news-edit.component.html',
    styleUrls: ['./news-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsEditComponent implements OnInit, OnDestroy {
    formGroup: FormGroup;
    errorMessage: string;

    private activeUser: User;
    private newsId: string;
    private subscription = new Subscription();

    constructor(
        private localNewsService: LocalNewsService,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private headerService: HeaderService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.buildForm();
        this.subscription.add(
            this.userService.activeUser.subscribe(u => (this.activeUser = u))
        );

        this.newsId = this.route.snapshot.paramMap.get('id');
        this.headerService.setHeader(this.newsId ? 'Edit' : 'Create');
        if (this.newsId) {
            this.localNewsService
                .getNewsById(this.newsId)
                .pipe(take(1))
                .subscribe(item => {
                    this.fillInForm(item);
                });
        } else {
            this.fillInForm({
                id: -1,
                heading: '',
                date: new Date().toString(),
                content: '',
                shortDescription: '',
                sourceUrl: '',
                author: (this.activeUser && this.activeUser.login) || ''
            });
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onSubmit() {
        const model: LocalNewsModel = {
            id: this.newsId !== null ? parseInt(this.newsId, 10) : -1,
            heading: this.formGroup.get('heading').value,
            shortDescription: this.formGroup.get('shortDescription').value,
            content: this.formGroup.get('content').value,
            date: new Date().toISOString(),
            author: this.formGroup.get('author').value,
            sourceUrl: this.formGroup.get('sourceUrl').value,
            imageUrl: this.formGroup.get('imageUrl').value,
            imageData: this.formGroup.get('imageData').value,
            useImageData: this.formGroup.get('useImageData').value
        };

        if (model.id === -1) {
            this.localNewsService.createNews(model).subscribe(
                () => this.navigateHome(),
                (errorResponse: HttpErrorResponse) =>
                    this.processError(errorResponse)
            );
        } else {
            this.localNewsService.editNews(model).subscribe(
                () => this.navigateHome(),
                (errorResponse: HttpErrorResponse) =>
                    this.processError(errorResponse)
            );
        }
    }

    onFileChange(event: Event) {
        const target = event.target as HTMLInputElement;
        if (!target.files || !target.files[0]) {
            return;
        }

        const reader = new FileReader();
        reader.onload = (progressEvent: ProgressEvent) => {
            const { result } = progressEvent.target as FileReader;
            this.formGroup.get('imageData').setValue(result);
            this.cdr.detectChanges();
        };

        reader.readAsDataURL(target.files[0]);
    }

    cancel() {
        this.navigateHome();
    }

    private buildForm() {
        this.formGroup = new FormGroup({
            heading: new FormControl('', [Validators.required]),
            shortDescription: new FormControl(),
            content: new FormControl(),
            imageUrl: new FormControl(),
            imageData: new FormControl(),
            useImageData: new FormControl(),
            date: new FormControl(),
            author: new FormControl(),
            sourceUrl: new FormControl('', [Validators.required])
        });
    }

    private fillInForm(model: LocalNewsModel) {
        this.formGroup.setValue({
            heading: model.heading,
            shortDescription: model.shortDescription,
            content: model.content,
            imageUrl: model.imageUrl || '',
            imageData: model.imageData || '',
            useImageData: !!model.useImageData,
            date: model.date.toLocaleString(),
            author: model.author,
            sourceUrl: model.sourceUrl
        });

        this.cdr.detectChanges();
    }

    private navigateHome() {
        this.router.navigate(['/']);
    }

    private processError(errorResponse: HttpErrorResponse) {
        this.errorMessage = errorResponse.error;
    }
}
