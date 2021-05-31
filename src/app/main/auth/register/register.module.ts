import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/shared/material.module";
import { RegisterRoutingModule } from "./register-routing.module";
import { RegisterComponent } from "./register.component";

@NgModule({
    declarations: [RegisterComponent],
    imports: [
        RegisterRoutingModule,
        MaterialModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class RegisterModule {}