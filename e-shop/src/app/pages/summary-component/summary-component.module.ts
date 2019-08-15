import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedComponentsModule} from "../../shared-components/shared-components.module";
import {SummaryComponent} from "./summary-component.component";
import {SummaryRoutingModule} from "./summary-routing.module";
import {
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
} from "@angular/material";
import {ReactiveFormsModule} from "@angular/forms";

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
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
  providers: []
})
export class SummaryComponentModule { }
