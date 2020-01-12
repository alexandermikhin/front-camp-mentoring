import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainViewComponent } from "./components/main-view/main-view.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";

const routes: Routes = [
  { path: "", component: MainViewComponent },
  { path: "404", component: PageNotFoundComponent },
  { path: "**", redirectTo: "/404" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
