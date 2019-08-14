import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedComponentsModule} from "../../shared-components/shared-components.module";
import {BasketComponentComponent} from "./basket-component.component";
import {BasketComponentRoutingModuleRoutingModule} from "./basket-component-routing.module";

@NgModule({
  declarations: [
    BasketComponentComponent ,
  ],
  imports: [
    CommonModule,
    BasketComponentRoutingModuleRoutingModule,
    SharedComponentsModule,
  ],
  providers: []
})
export class BasketComponentModuleModule { }
