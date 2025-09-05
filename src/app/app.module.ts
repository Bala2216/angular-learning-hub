import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SurveyCreatorComponent } from './components/survey-creator/survey-creator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { SurveyPreviewComponent } from './components/survey-preview/survey-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    SurveyCreatorComponent,
    FeedbackFormComponent,
    SurveyPreviewComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
