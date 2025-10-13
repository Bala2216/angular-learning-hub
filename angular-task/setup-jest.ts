import 'zone.js'; // Load Zone.js globally
import 'zone.js/testing'; // Load Angular testing patches

import 'jest-preset-angular/presets';

import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
