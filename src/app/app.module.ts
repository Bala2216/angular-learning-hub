import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SurveyCreatorComponent } from './components/survey-creator/survey-creator.component';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { SurveyPreviewComponent } from './components/survey-preview/survey-preview.component';
import { UserListComponent } from './components/user/user-list/user-list.component';

import { JsonFormsModule } from '@jsonforms/angular';
import { JsonFormsAngularMaterialModule } from '@jsonforms/angular-material';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './store/user/user.reducer';
import { UserEffects } from './store/user/user.effects';
import { UserModule } from './components/user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    SurveyCreatorComponent,
    FeedbackFormComponent,
    SurveyPreviewComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    JsonFormsModule,
    JsonFormsAngularMaterialModule,
    StoreModule.forRoot({ user: userReducer }),
    EffectsModule.forRoot([UserEffects]),
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
