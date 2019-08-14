import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {BasketComponentComponent} from "./basket-component.component";

const routes: Routes = [
  {
    path: '',
    component: BasketComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasketComponentRoutingModuleRoutingModule { }
