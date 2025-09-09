import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyCreatorComponent } from './components/survey-creator/survey-creator.component';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { SurveyPreviewComponent } from './components/survey-preview/survey-preview.component';
import { UserListComponent } from './components/user/user-list/user-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/survey', pathMatch: 'full' },
  { path: 'survey', component: SurveyCreatorComponent },
  { path: 'feedback', component: FeedbackFormComponent },
  { path: 'preview', component: SurveyPreviewComponent },
  { path: 'user-list', component: UserListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
