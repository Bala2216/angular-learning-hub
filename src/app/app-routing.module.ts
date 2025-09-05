import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyCreatorComponent } from './components/survey-creator/survey-creator.component';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { SurveyPreviewComponent } from './components/survey-preview/survey-preview.component';

const routes: Routes = [
  { path: '', redirectTo: '/survey', pathMatch: 'full' },
  { path: 'survey', component: SurveyCreatorComponent },
  { path: 'feedback', component: FeedbackFormComponent },
  { path: 'preview', component: SurveyPreviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
