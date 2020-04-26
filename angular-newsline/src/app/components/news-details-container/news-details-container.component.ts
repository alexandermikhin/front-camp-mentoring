import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { getNewsItemFromLocal } from 'src/app/helpers/news-item-model-helpers';
import { NewsItemModel, User } from 'src/app/models';
import { HeaderService, LocalNewsService, UserService } from 'src/app/services';

@Component({
    selector: 'nl-news-details-container',
    templateUrl: './news-details-container.component.html'
})
export class NewsDetailsContainerComponent implements OnInit, OnDestroy {
    model: NewsItemModel | undefined;

    private subscription = new Subscription();
    private activeUser: User;
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
            this.route.paramMap.subscribe(param => {
                this.newsId = param.get('id');
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

    onDelete(id: string) {
        this.localNewsService.deleteNews(id);
        this.router.navigate(['/']);
    }

    onEdit(id: string) {
        this.router.navigate(['/edit', id]);
    }

    private updateNewsModel() {
        this.localNewsService
            .getNews({ sourceUrl: this.newsId })
            .pipe(take(1))
            .subscribe(items => {
                this.model =
                    items && items[0]
                        ? getNewsItemFromLocal(items[0])
                        : undefined;

                this.setRights(this.model);
                this.updateHeader();
            });
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
