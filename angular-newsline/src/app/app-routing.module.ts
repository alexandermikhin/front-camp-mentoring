import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsDetailsComponent } from './components/news-details/news-details.component';
import { NewsEditComponent } from './components/news-edit/news-edit.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { EditGuard } from './guards/edit.guard';

const routes: Routes = [
  { path: '', component: NewsListComponent },
  { path: 'local/:id', component: NewsDetailsComponent },
  { path: 'newsapi/:id', component: NewsDetailsComponent },
  { path: 'edit', component: NewsEditComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: NewsEditComponent, canActivate: [EditGuard] },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
