import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NewsItemModel } from 'src/app/models/news-item.model';
import { User } from 'src/app/models/user.model';
import { LocalNewsService } from 'src/app/services/localnews.service';
import { NewsApiService } from 'src/app/services/newsapi.service';
import { UserService } from 'src/app/services/user.service';
import { HeaderService } from 'src/app/services/header.service';

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
        private newsApiService: NewsApiService,
        private userService: UserService,
        private headerService: HeaderService) { }

    ngOnInit() {
        this.subscription.add(this.route.url.subscribe(url => {
            this.source = url[0].path;
            this.newsId = url[1].path;
            this.updateNewsModel();
            this.updateHeader();
        }));

        this.subscription.add(this.userService.activeUser.subscribe(u => {
            this.activeUser = u;
            this.updateNewsModel();
            this.updateHeader();
        }));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onDeleteClick() {
        this.localNewsService.deleteNews(this.model.id);
        this.router.navigate(['/']);
    }

    private updateNewsModel() {
        let model: NewsItemModel | undefined;
        switch (this.source) {
            case 'local':
                model = this.localNewsService.getNewsById(this.newsId);
                model.isEditable = this.activeUser && this.activeUser.login === model.author;
                break;
            case 'newsapi':
                model = this.newsApiService.getNewsById(this.newsId);
                break;
            default:
                model = undefined;
                break;
        }

        this.model = model;
    }

    private updateHeader() {
        this.headerService.setHeader(this.model ? this.model.heading : '');
    }
}
