import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedComponentsModule} from "../../shared-components/shared-components.module";
import {SummaryComponent} from "./summary-component.component";
import {SummaryRoutingModule} from "./summary-routing.module";
import {MatFormFieldModule,
        MatInputModule,
        } from "@angular/material";

@NgModule({
  declarations: [
    SummaryComponent
  ],
  imports: [
    CommonModule,
    SummaryRoutingModule,
    SharedComponentsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: []
})
export class SummaryComponentModule { }
