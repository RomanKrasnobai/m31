import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {SummaryComponent} from "./summary-component.component";

const routes: Routes = [
  {
    path: '',
    component: SummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SummaryRoutingModule { }
