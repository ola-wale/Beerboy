/**
 * Test dependencies
 * exports an object with dependencies for testing
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MatProgressSpinnerModule, MatDialogModule, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routing } from './app.routes';

import { AppComponent } from './app.component';
import { BeerCardComponent } from './beer-card/beer-card.component';
import { DetailComponent, DetailDialogComponent } from './detail/detail.component';

export var testDeps = {
  declarations: [
    AppComponent,
    BeerCardComponent,
    DetailComponent,
    DetailDialogComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatDialogModule,
    BrowserModule,
    RouterModule,
    HttpModule,
    routing
  ],
  entryComponents:[
    DetailDialogComponent
  ],
  providers: [
    HttpModule,
    {provide: MatDialogRef, useValue: {}},
    {provide: MAT_DIALOG_DATA, useValue: {}},
    {provide: APP_BASE_HREF, useValue : '/' }
  ],
  bootstrap: [AppComponent]
}
