import {
    Component,
    ComponentFactory,
    ComponentFactoryResolver,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import {
    getNewsItemFromLocal,
    getNewsItemModel
} from 'src/app/helpers/news-item-model-helpers';
import {
    FilterModel,
    LocalNewsModel,
    NewsApiArticleModel,
    NewsApiSourceModel,
    NewsItemModel,
    SourceModel,
    User
} from 'src/app/models';
import { SearchWithinPipe } from 'src/app/pipes';
import {
    HeaderService,
    LocalNewsService,
    NewsApiService,
    UserService
} from 'src/app/services';
import { NewsListItemComponent } from '../news-list-item/news-list-item.component';

@Component({
    selector: 'nl-news-list',
    templateUrl: './news-list.component.html',
    styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit, OnDestroy {
    @ViewChild('newsItemsHost', { static: true, read: ViewContainerRef })
    newsItemsContainer: ViewContainerRef;
    displayedNews: NewsItemModel[] = [];
    userNewsOnly = false;
    q = '';
    searchWithinPhrase = '';
    sources: SourceModel[];
    selectedSourceId: string;
    canAddNews: boolean;
    activeModel: NewsItemModel | undefined;

    private readonly initialStartPage = 1;
    private startPage = 1;
    private pageSize = 5;
    private activeUser: User | undefined;
    private subscription = new Subscription();
    private newsApiArticles: NewsApiArticleModel[] = [];
    private localArticles: LocalNewsModel[] = [];
    private newsItemComponentFactory: ComponentFactory<NewsListItemComponent>;

    constructor(
        private router: Router,
        private newsApiService: NewsApiService,
        private localNewsService: LocalNewsService,
        private userService: UserService,
        private headerService: HeaderService,
        private searchWithinPipe: SearchWithinPipe,
        componentFactoryResolver: ComponentFactoryResolver
    ) {
        this.newsItemComponentFactory = componentFactoryResolver.resolveComponentFactory(
            NewsListItemComponent
        );
    }

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
                this.updateHeader();
            });

        this.subscription.add(
            this.userService.activeUser.subscribe(u => {
                this.activeUser = u;
                this.setEditRights(this.displayedNews);
                this.renderDisplayedItems();
                this.canAddNews = !!this.activeUser;
            })
        );
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
        this.localNewsService
            .deleteNews(id)
            .subscribe(() => this.getLocalNews());
    }

    onAddNews() {
        this.router.navigate(['/create']);
    }

    onEditNews(id?: string) {
        this.router.navigate(['/edit', id || '']);
    }

    onExpandNews(model: NewsItemModel) {
        this.activeModel = model;
        this.headerService.setHeader(model.heading);
    }

    onDetailsBack() {
        this.activeModel = undefined;
        this.updateHeader();
    }

    onSearchWithinApply(value: string) {
        this.searchWithinPhrase = value;
        this.renderDisplayedItems();
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

        this.localNewsService
            .getNews({
                q: this.q,
                author,
                page: this.startPage,
                pageSize: this.pageSize
            })
            .pipe(take(1))
            .subscribe(response => {
                this.localArticles = append
                    ? this.localArticles.concat(response)
                    : response;
                this.initDisplayedNews();
            });
    }

    private initDisplayedNews() {
        const newsApiItems: NewsItemModel[] = this.newsApiArticles.map(a =>
            getNewsItemModel(a)
        );

        const localNewsItems: NewsItemModel[] = this.localArticles.map(a =>
            getNewsItemFromLocal(a)
        );

        const combinedNews = newsApiItems.concat(localNewsItems);
        this.sortNews(combinedNews);
        this.setEditRights(combinedNews);
        this.displayedNews = combinedNews;
        this.renderDisplayedItems();
    }

    private renderDisplayedItems() {
        this.newsItemsContainer.clear();
        const filteredItems =
            this.searchWithinPipe.transform(
                this.displayedNews,
                this.searchWithinPhrase
            ) || [];

        for (const item of filteredItems) {
            const componentRef = this.newsItemsContainer.createComponent(
                this.newsItemComponentFactory
            );
            const instance: NewsListItemComponent = componentRef.instance;
            instance.model = item;
            instance.searchWithin = this.searchWithinPhrase;
            instance.deleteNews.subscribe((event: string) =>
                this.onDeleteNews(event)
            );
            instance.editNews.subscribe((event: string) =>
                this.onEditNews(event)
            );
            instance.expandNews.subscribe((event: NewsItemModel) =>
                this.onExpandNews(event)
            );

            componentRef.onDestroy(() => {
                instance.deleteNews.unsubscribe();
                instance.editNews.unsubscribe();
            });
        }
    }

    private getSource(source: NewsApiSourceModel): SourceModel {
        return { id: source.id, title: source.name };
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
        const selectedSource = this.sources.find(
            s => s.id === this.selectedSourceId
        );

        if (selectedSource) {
            this.headerService.setHeader(selectedSource.title);
        }
    }
}
