import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/shared/material.module";
import { ProgressSpinnerComponent, ProgressSpinnerModule } from "../../common-components/progress-spinner/progress-spinner.component";
import { ProgressSpinnerService } from "../../common-components/progress-spinner/progress-spinner.service";
import { RegisterRoutingModule } from "./register-routing.module";
import { RegisterComponent } from "./register.component";

@NgModule({
    declarations: [RegisterComponent],
    imports: [
        RegisterRoutingModule,
        MaterialModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ProgressSpinnerModule
    ],
    entryComponents: [ProgressSpinnerComponent],
    providers: [ProgressSpinnerService]
})
export class RegisterModule {}