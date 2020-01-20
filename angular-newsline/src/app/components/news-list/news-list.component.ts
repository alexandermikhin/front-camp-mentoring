import { Component, OnInit } from '@angular/core';
import { NewsItemModel } from 'src/app/models/news-item.model';
import { LocalNewsService } from 'src/app/services/localnews.service';
import { NewsApiService } from 'src/app/services/newsapi.service';

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
    private startPage = 1;
    private pageSize = 5;

    constructor(private newsApiService: NewsApiService,
        private localNewsService: LocalNewsService) { }

    ngOnInit() {
        this.sources = [
            'All',
            ...this.newsApiService.getSources()
        ];

        this.updateNews();
    }

    loadMoreClick() {
        this.startPage++;
        this.updateNews();
    }

    private updateNews() {
        if (this.showLocalNews) {
            this.localNews = [];
        } else {
            const source = this.selectedSource === 'All' ? '' : this.selectedSource;
            const news = this.newsApiService.getNews(this.q, source, this.startPage, this.pageSize);
            this.newsApiNews = this.newsApiNews.concat(news);
        }

        this.displayedNews = this.showLocalNews ? this.localNews : this.newsApiNews;
    }
}
