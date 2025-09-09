import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SurveyCreatorComponent } from './components/survey-creator/survey-creator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { SurveyPreviewComponent } from './components/survey-preview/survey-preview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JsonFormsModule } from '@jsonforms/angular';
import { JsonFormsAngularMaterialModule } from '@jsonforms/angular-material';
import { UserModule } from "./components/user/user.module";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SurveyCreatorComponent,
    FeedbackFormComponent,
    SurveyPreviewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    JsonFormsModule,
    JsonFormsAngularMaterialModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    UserModule
],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
