import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    NewsDetailsContainerComponent,
    NewsEditComponent,
    NewsListComponent,
    PageNotFoundComponent
} from './components';
import { AuthGuard, EditGuard } from './guards';

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
