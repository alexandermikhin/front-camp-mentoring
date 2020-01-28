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
    selector: 'nl-news-details',
    templateUrl: './news-details.component.html',
    styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit, OnDestroy {
    model: NewsItemModel | undefined;

    private subscription = new Subscription();
    private activeUser: User;
    private source: string;
    private newsId: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private localNewsService: LocalNewsService,
        private userService: UserService,
        private headerService: HeaderService
    ) {}

    ngOnInit() {
        this.subscription.add(
            this.route.url.subscribe(url => {
                this.source = url[0].path;
                this.newsId = url[1].path;
                this.updateNewsModel();
            })
        );

        this.subscription.add(
            this.userService.activeUser.subscribe(u => {
                this.activeUser = u;
                this.setRights(this.model);
            })
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onDeleteClick() {
        this.localNewsService.deleteNews(this.model.id);
        this.router.navigate(['/']);
    }

    private updateNewsModel() {
        switch (this.source) {
            case 'local':
                this.localNewsService
                    .getNewsById(this.newsId)
                    .pipe(take(1))
                    .subscribe(item => {
                        const model = getNewsItemFromLocal(item);
                        this.setRights(model);
                        this.model = model;
                        this.updateHeader();
                    });

                break;
            default:
                this.model = undefined;
                break;
        }
    }

    private setRights(item: NewsItemModel | undefined) {
        if (!item) {
            return;
        }

        item.isEditable =
            this.activeUser && this.activeUser.login === item.author;
    }

    private updateHeader() {
        this.headerService.setHeader(this.model ? this.model.heading : '');
    }
}
