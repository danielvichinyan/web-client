import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/shared/material.module";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";

@NgModule({
    declarations: [LoginComponent],
    imports: [
        LoginRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule
    ]
})
export class LoginModule {}