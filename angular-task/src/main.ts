import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { combinedReducer } from './app/ngRX/store/combined.reducer';
import { CombinedEffects } from './app/ngRX/store/combined.effects';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { CombinedService } from './app/ngRX/services/combined.service';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(),
    // provideStore({ combined: combinedReducer }),
    // provideEffects([CombinedEffects]),
    //CombinedService,
  ],
}).catch((err) => console.error(err));
