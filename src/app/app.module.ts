import { BrowserModule } from '@angular/platform-browser';
import { NgModule,Injector } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MatProgressSpinnerModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routing } from './app.routes';

import { AppComponent } from './app.component';
import { BeerCardComponent } from './beer-card/beer-card.component';
import { DetailComponent, DetailDialogComponent } from './detail/detail.component';

@NgModule({
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
    HttpModule,
    routing
  ],
  entryComponents:[
    DetailDialogComponent
  ],
  providers: [HttpModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
