import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NewsDetailsComponent } from './components/news-details/news-details.component';
import { NewsEditComponent } from './components/news-edit/news-edit.component';
import { NewsListItemComponent } from './components/news-list-item/news-list-item.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainViewComponent,
    NavigationComponent,
    NewsDetailsComponent,
    NewsEditComponent,
    NewsListComponent,
    NewsListItemComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
