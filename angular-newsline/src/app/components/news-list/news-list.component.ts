import { Component, OnInit } from '@angular/core';
import { NewsItemModel } from 'src/app/models/news-item.model';
import { LocalNewsService } from 'src/app/services/localnews.service';
import { NewsApiService } from 'src/app/services/newsapi.service';
import { FilterModel } from 'src/app/models/filter.model';

@Component({
    selector: 'nl-news-list',
    templateUrl: './news-list.component.html',
    styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
    displayedNews: NewsItemModel[] = [];
    showLocalNews = false;
    q = '';
    sources: string[];
    selectedSource = 'All';

    private newsApiNews: NewsItemModel[] = [];
    private localNews: NewsItemModel[] = [];
    private readonly initialStartPage = 1;
    private startPage = 1;
    private pageSize = 5;

    constructor(private newsApiService: NewsApiService,
        private localNewsService: LocalNewsService) { }

    ngOnInit() {
        this.sources = [
            'All',
            ...this.newsApiService.getSources()
        ];

        this.startPage = this.initialStartPage;

        this.displayedNews = this.getDisplayNews();
    }

    filterAppliedHandler(filter: FilterModel) {
        this.selectedSource = filter.source;
        this.showLocalNews = filter.showLocalNews;
        this.q = filter.q;
        this.startPage = this.initialStartPage;
        this.displayedNews = this.getDisplayNews();
    }

    loadMoreClick() {
        this.startPage++;
        const news = this.getDisplayNews();
        this.displayedNews = this.displayedNews.concat(news);
    }

    private getDisplayNews(): NewsItemModel[] {
        if (this.showLocalNews) {
            this.localNews = [];
        } else {
            const source = this.selectedSource === 'All' ? '' : this.selectedSource;
            const news = this.newsApiService.getNews(this.q, source, this.startPage, this.pageSize);
            this.newsApiNews = news;
        }

        return this.showLocalNews ? this.localNews : this.newsApiNews;
    }
}
