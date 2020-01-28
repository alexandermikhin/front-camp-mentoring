import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NewsDetailsComponent } from './components/news-details/news-details.component';
import { NewsEditComponent } from './components/news-edit/news-edit.component';
import { NewsListItemComponent } from './components/news-list-item/news-list-item.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AuthGuard } from './guards/auth.guard';
import { EditGuard } from './guards/edit.guard';
import { HighlightPipe } from './pipes/highlight.pipe';
import { SearchWithinPipe } from './pipes/search-within.pipe';
import { HeaderService } from './services/header.service';
import { LocalNewsService } from './services/localnews.service';
import { NewsApiService } from './services/newsapi.service';
import { UserService } from './services/user.service';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        ToolbarComponent,
        NewsDetailsComponent,
        NewsEditComponent,
        NewsListComponent,
        NewsListItemComponent,
        PageNotFoundComponent,
        SearchWithinPipe,
        HighlightPipe
    ],
    imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule],
    providers: [
        UserService,
        LocalNewsService,
        NewsApiService,
        HeaderService,
        AuthGuard,
        EditGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
