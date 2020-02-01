import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsDetailsContainerComponent } from './components/news-details-container/news-details-container.component';
import { NewsEditComponent } from './components/news-edit/news-edit.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { EditGuard } from './guards/edit.guard';

const routes: Routes = [
    { path: '', component: NewsListComponent },
    { path: 'details/:id', component: NewsDetailsContainerComponent },
    { path: 'create', component: NewsEditComponent, canActivate: [AuthGuard] },
    {
        path: 'edit/:id',
        component: NewsEditComponent,
        canActivate: [EditGuard]
    },
    { path: '404', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/404' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
