import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
    FooterComponent,
    HeaderComponent,
    LoginPopupComponent,
    NewsDetailsComponent,
    NewsDetailsContainerComponent,
    NewsEditComponent,
    NewsListComponent,
    NewsListItemComponent,
    PageNotFoundComponent,
    ToolbarComponent
} from './components';
import { AuthGuard, EditGuard } from './guards';
import { HighlightPipe, SearchWithinPipe } from './pipes';
import {
    HeaderService,
    LocalNewsService,
    LoginService,
    NewsApiService,
    UserService
} from './services';

@NgModule({
    declarations: [
        // Components
        AppComponent,
        FooterComponent,
        HeaderComponent,
        LoginPopupComponent,
        NewsDetailsComponent,
        NewsDetailsContainerComponent,
        NewsEditComponent,
        NewsListComponent,
        NewsListItemComponent,
        PageNotFoundComponent,
        ToolbarComponent,
        // Pipes
        HighlightPipe,
        SearchWithinPipe
    ],
    entryComponents: [LoginPopupComponent, NewsListItemComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        AuthGuard,
        EditGuard,
        HeaderService,
        LocalNewsService,
        LoginService,
        NewsApiService,
        SearchWithinPipe,
        UserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
