import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FilterModel } from 'src/app/models/filter.model';
import { NewsItemModel } from 'src/app/models/news-item.model';
import { User } from 'src/app/models/user.model';
import { HeaderService } from 'src/app/services/header.service';
import { LocalNewsService } from 'src/app/services/localnews.service';
import { NewsApiService } from 'src/app/services/newsapi.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'nl-news-list',
    templateUrl: './news-list.component.html',
    styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit, OnDestroy {
    displayedNews: NewsItemModel[] = [];
    userNewsOnly = false;
    q = '';
    sources: string[];
    selectedSource = 'All';

    private readonly initialStartPage = 1;
    private startPage = 1;
    private pageSize = 5;
    private activeUser: User;
    private subscription = new Subscription();

    constructor(
        private router: Router,
        private newsApiService: NewsApiService,
        private localNewsService: LocalNewsService,
        private userService: UserService,
        private headerService: HeaderService) { }

    ngOnInit() {
        this.sources = [
            'All',
            ...this.newsApiService.getSources()
        ];

        this.startPage = this.initialStartPage;
        this.displayedNews = this.getDisplayNews();
        this.subscription.add(this.userService.activeUser.subscribe(u => {
            this.activeUser = u;
            this.displayedNews = this.getDisplayNews();
        }));

        this.updateHeader();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    filterAppliedHandler(filter: FilterModel) {
        this.selectedSource = filter.source;
        this.userNewsOnly = filter.userNewsOnly;
        this.q = filter.q;
        this.startPage = this.initialStartPage;
        this.displayedNews = this.getDisplayNews();
        this.updateHeader();
    }

    onDeleteNews(id: string) {
        this.localNewsService.deleteNews(id);
        this.displayedNews = this.getDisplayNews();
    }

    onEditNews(id?: string) {
        this.router.navigate(['/edit', { id: id || '' }]);
    }

    loadMoreClick() {
        this.startPage++;
        const news = this.getDisplayNews();
        this.displayedNews = this.displayedNews.concat(news);
    }

    private getDisplayNews(): NewsItemModel[] {
        let news: NewsItemModel[] = [];
        const author = this.userNewsOnly ? this.activeUser && this.activeUser.login || '' : undefined;
        const localNews = this.localNewsService.getNews(this.q, author, this.startPage, this.pageSize);
        localNews.forEach(n => {
            n.isEditable = this.activeUser && this.activeUser.login === n.author;
            n.localUrl = `/local/${n.id}`;
        });
        news = news.concat(localNews);

        if (!this.userNewsOnly) {
            const source = this.selectedSource === 'All' ? '' : this.selectedSource;
            const newsApiNews = this.newsApiService.getNews(this.q, source, this.startPage, this.pageSize);
            newsApiNews.forEach(n => n.localUrl = `/newsapi/${n.id}`);
            news = news.concat(newsApiNews);
        }

        news.sort((a, b) => {
            if (a.date === b.date) {
                return 0;
            }

            if (a.date < b.date) {
                return 1;
            }

            return -1;
        });

        return news;
    }

    private updateHeader() {
        this.headerService.setHeader(this.selectedSource);
    }
}
