import { Component, OnDestroy, OnInit } from '@angular/core';
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
    model: NewsItemModel;

    private activeUser: User;
    private subscription = new Subscription();

    constructor(
        private localNewsService: LocalNewsService,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private headerService: HeaderService
    ) {}

    ngOnInit() {
        this.subscription.add(
            this.userService.activeUser.subscribe(u => (this.activeUser = u))
        );
        const id = this.route.snapshot.paramMap.get('id');
        this.headerService.setHeader(id ? 'Edit' : 'Create');
        if (id) {
            this.localNewsService
                .getNewsById(id)
                .pipe(take(1))
                .subscribe(item => (this.model = getNewsItemFromLocal(item)));
        } else {
            this.model = {
                id: '',
                heading: '',
                date: new Date(),
                content: '',
                shortDescription: '',
                source: '',
                author: (this.activeUser && this.activeUser.login) || ''
            };
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onSubmit() {
        this.localNewsService.editNews(this.model);
        this.navigateHome();
    }

    cancel() {
        this.navigateHome();
    }

    private navigateHome() {
        this.router.navigate(['/']);
    }
}
