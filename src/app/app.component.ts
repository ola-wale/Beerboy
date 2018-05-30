import { Component, OnDestroy, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { PunkApiService } from './services/punk-api.service';
import { Beer } from './interfaces/beer.interface';
import { DetailComponent, DetailDialogComponent } from './detail/detail.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy,OnInit {
  title = 'Beerboy';
  currentPage: number = 1;
  beers: Beer[];
  loaded: boolean;
  events: Event[];
  onDocumentScroll;
  fetchedAll:boolean = false;
  constructor(private api: PunkApiService) {}

  ngOnInit():void{
    //infinite scroll
    this.onDocumentScroll = () => {
        if ((((window.innerHeight + window.pageYOffset) / document.body.offsetHeight) * 100) >= 90 && this.loaded && !this.fetchedAll) {
          this.loadBeers();
        }
    }
    //load the beers
    this.loadBeers();
    document.addEventListener('scroll', this.onDocumentScroll);
  }

  ngOnDestroy():void {
    document.removeEventListener('scroll', this.onDocumentScroll, false);
  }

  /**
   * Get the beers
   */
  loadBeers():void {
    this.loaded = false;
    this.api.getBeers(this.currentPage)
      .pipe(take(1))
      .subscribe(data => {
        if (this.beers) {
          this.beers = this.beers.concat(data.json())
        } else {
          this.beers = data.json();
        }
        /**
        if the length of the result data is 0,
        set the fetchedAll variable to true
        **/
        if(data.json().length == 0){
          this.fetchedAll = true;
        }
        //increment the current page
        this.currentPage++;
      }, err => {
        err = err.json();
        //If punkApi gives an error message, show an alert with it else show something ambiguous
        if(err.hasOwnProperty('message')){
          alert(err.message);
        } else {
          alert(`An unknown error has occurred while fetching the list of beers,
            please try again later.`);
        }
        this.loaded = true;
      }, () => {
        this.loaded = true;
      })
  }

}
