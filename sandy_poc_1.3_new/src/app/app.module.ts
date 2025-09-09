import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JsonFormsModule } from '@jsonforms/angular';
import { JsonFormsAngularMaterialModule } from '@jsonforms/angular-material';

import { AppComponent } from './app.component';
import { CustomAutocompleteControlRenderer } from './custom.autocomplete';
import { DataDisplayComponent } from './data.control';
import { LangComponent } from './lang.control';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItDeptFormComponent } from './it-dept-form/it-dept-form.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from "./header/header.component";


@NgModule({
    declarations: [
        AppComponent,
        CustomAutocompleteControlRenderer,
        LangComponent,
        DataDisplayComponent
    ],
    schemas: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        JsonFormsModule,
        JsonFormsAngularMaterialModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        HttpClientModule,
        AppRoutingModule,
        DashboardComponent,
        ItDeptFormComponent,
        HeaderComponent
    ]
})
export class AppModule {
}
