import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedComponentsModule} from "../../shared-components/shared-components.module";
import {BasketComponentComponent} from "./basket-component.component";
import {BasketComponentRoutingModuleRoutingModule} from "./basket-component-routing.module";
import {MatButtonModule} from "@angular/material";

@NgModule({
  declarations: [
    BasketComponentComponent,
  ],
  imports: [
    CommonModule,
    BasketComponentRoutingModuleRoutingModule,
    SharedComponentsModule,
    MatButtonModule,
  ],
  providers: []
})
export class BasketComponentModuleModule { }
