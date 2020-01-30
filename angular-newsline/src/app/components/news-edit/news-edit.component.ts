import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { getNewsItemFromLocal } from 'src/app/helpers/news-item-model-helpers';
import { NewsItemModel } from 'src/app/models/news-item.model';
import { User } from 'src/app/models/user.model';
import { HeaderService } from 'src/app/services/header.service';
import { LocalNewsService } from 'src/app/services/localnews.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'nl-news-edit',
    templateUrl: './news-edit.component.html',
    styleUrls: ['./news-edit.component.scss']
})
export class NewsEditComponent implements OnInit, OnDestroy {
    formGroup: FormGroup;

    private activeUser: User;
    private newsId: string;
    private subscription = new Subscription();

    constructor(
        private localNewsService: LocalNewsService,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private headerService: HeaderService
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
                    const model = getNewsItemFromLocal(item);
                    this.fillInForm(model);
                });
        } else {
            this.fillInForm({
                id: '',
                heading: '',
                date: new Date(),
                content: '',
                shortDescription: '',
                source: '',
                author: (this.activeUser && this.activeUser.login) || ''
            });
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onSubmit() {
        const model: NewsItemModel = {
            id: this.newsId,
            heading: this.formGroup.get('heading').value,
            date: new Date(),
            content: this.formGroup.get('content').value,
            shortDescription: this.formGroup.get('shortDescription').value,
            source: this.formGroup.get('source').value,
            author: this.formGroup.get('author').value
        };

        this.localNewsService.editNews(model);
        this.navigateHome();
    }

    cancel() {
        this.navigateHome();
    }

    private buildForm() {
        this.formGroup = new FormGroup({
            heading: new FormControl('', [Validators.required]),
            shortDescription: new FormControl(),
            content: new FormControl(),
            useLocalUrl: new FormControl(),
            image: new FormControl(),
            date: new FormControl(),
            author: new FormControl(),
            sourceUrl: new FormControl('', [Validators.required])
        });
    }

    private fillInForm(model: NewsItemModel) {
        this.formGroup.setValue({
            heading: model.heading,
            shortDescription: model.shortDescription,
            content: model.content,
            useLocalUrl: model.useLocalImageUrl,
            image: model.image,
            date: model.date.toLocaleString(),
            author: model.author,
            sourceUrl: model.sourceUrl
        });
    }

    private navigateHome() {
        this.router.navigate(['/']);
    }
}
