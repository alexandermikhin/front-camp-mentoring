import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { FilterModel } from 'src/app/models/filter.model';
import { NewsItemModel } from 'src/app/models/news-item.model';
import { NewsApiArticleModel } from 'src/app/models/newsapi-response.model';
import { NewsApiSourceModel } from 'src/app/models/newsapi-sources.model';
import { User } from 'src/app/models/user.model';
import { SourceModel } from 'src/app/models/view-models/source.model';
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
    sources: SourceModel[];
    selectedSourceId: string;
    canAddNews: boolean;

    private readonly initialStartPage = 1;
    private startPage = 1;
    private pageSize = 5;
    private activeUser: User;
    private subscription = new Subscription();
    private newsApiArticles: NewsApiArticleModel[] = [];
    private localArticles: NewsItemModel[] = [];

    constructor(
        private router: Router,
        private newsApiService: NewsApiService,
        private localNewsService: LocalNewsService,
        private userService: UserService,
        private headerService: HeaderService
    ) {}

    ngOnInit() {
        this.startPage = this.initialStartPage;

        this.newsApiService
            .getSources()
            .pipe(take(1))
            .subscribe(response => {
                const newsApiSources = response.sources.map(s =>
                    this.getSource(s)
                );

                this.sources = [{ id: 'all', title: 'All' }, ...newsApiSources];
                this.selectedSourceId = this.sources[0].id;
                this.getNewsApiNews();
                this.getLocalNews();
            });

        this.subscription.add(
            this.userService.activeUser.subscribe(u => {
                this.activeUser = u;
                this.setEditRights(this.displayedNews);
                this.canAddNews = !!this.activeUser;
            })
        );

        this.updateHeader();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    filterAppliedHandler(filter: FilterModel) {
        this.selectedSourceId = filter.sourceId;
        this.userNewsOnly = filter.userNewsOnly;
        this.q = filter.q;
        this.startPage = this.initialStartPage;
        this.getNewsApiNews();
        this.getLocalNews();
        this.updateHeader();
    }

    onDeleteNews(id: string) {
        this.localNewsService.deleteNews(id);
        this.getLocalNews();
    }

    onAddNews() {
        this.router.navigate(['/create']);
    }

    onEditNews(id?: string) {
        this.router.navigate(['/edit', id || '']);
    }

    loadMoreClick() {
        this.startPage++;
        this.getNewsApiNews(true);
        this.getLocalNews(true);
    }

    private getNewsApiNews(append?: boolean) {
        if (this.userNewsOnly) {
            return;
        }

        const source =
            this.selectedSourceId === 'all' ? '' : this.selectedSourceId;

        this.newsApiService
            .getNews(this.q, source, this.startPage, this.pageSize)
            .pipe(take(1))
            .subscribe(response => {
                this.newsApiArticles = append
                    ? this.newsApiArticles.concat(response.articles)
                    : response.articles;
                this.initDisplayedNews();
            });
    }

    private getLocalNews(append?: boolean) {
        if (this.selectedSourceId !== 'all') {
            return;
        }

        const author = this.userNewsOnly
            ? (this.activeUser && this.activeUser.login) || ''
            : undefined;

        const localNews = this.localNewsService.getNews(
            this.q,
            author,
            this.startPage,
            this.pageSize
        );

        localNews.forEach(n => {
            n.localUrl = `/local/${n.id}`;
        });

        this.localArticles = append
            ? this.localArticles.concat(localNews)
            : localNews;

        this.initDisplayedNews();
    }

    private initDisplayedNews() {
        const newsApiItems: NewsItemModel[] = this.newsApiArticles.map(a =>
            this.getNewsItemModel(a)
        );

        const localNewsItems: NewsItemModel[] = this.localArticles;
        const combinedNews = newsApiItems.concat(localNewsItems);
        this.sortNews(combinedNews);
        this.setEditRights(combinedNews);
        this.displayedNews = combinedNews;
    }

    private getSource(source: NewsApiSourceModel): SourceModel {
        return { id: source.id, title: source.name };
    }

    private getNewsItemModel(article: NewsApiArticleModel): NewsItemModel {
        return {
            content: article.content,
            date: new Date(article.publishedAt),
            heading: article.title,
            id: '',
            shortDescription: article.description,
            source: article.url,
            image: article.urlToImage
        };
    }

    private setEditRights(items: NewsItemModel[]) {
        items.forEach(
            n =>
                (n.isEditable =
                    this.activeUser && this.activeUser.login === n.author)
        );
    }

    private sortNews(items: NewsItemModel[]) {
        items.sort((a, b) => {
            if (a.date === b.date) {
                return 0;
            }

            if (a.date < b.date) {
                return 1;
            }

            return -1;
        });
    }

    private updateHeader() {
        this.headerService.setHeader(this.selectedSourceId);
    }
}
