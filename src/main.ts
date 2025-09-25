import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
// Import the ModuleRegistry and the AllCommunityModule (singular)
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

// Register all community features before bootstrapping the app
ModuleRegistry.registerModules([AllCommunityModule]);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));