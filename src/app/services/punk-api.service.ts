/**
 * PunkApiService
 * handles requests to https://punkapi.com
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Beer } from '../interfaces/beer.interface';
@Injectable({
  providedIn: 'root'
})
export class PunkApiService {
  public endPoint:String = 'https://api.punkapi.com/v2/';
  public beerPerPage:Number = 20;
  constructor(private http:Http) {}
  /**
   * GET request to PunkApi with the
   * page number as query string payload to get Beers.
   * @param {number} page current page number.
   * @return {Observable} Observable to subscribe to
   */
  getBeers(page:Number){
    return this.http.get(`${this.endPoint}beers?page=${page}&per_page=${this.beerPerPage}`,{});
  }
  /**
   * GET request to PunkApi with the
   * beer id as payload to get a single Beer.
   * @param {number} beerId beer id.
   * @return {Observable} Observable to subscribe to
   */
  getBeer(beerId:Number){
    return this.http.get(`${this.endPoint}beers/${beerId}`,{}).pipe(map(data => {
      /**
       * Make another request to get beers with similar ibus and add it to
       * the response
       */
      let beer:Beer = data.json()[0];
      this.getBeerWithSimilarIbu(beer.ibu).subscribe(similarData => {
        beer['similarBeers'] = similarData.json();
      });
      return beer;
    }));
  }
  /**
   * GET request to PunkApi with the
   * beer id as payload to get a single Beer with a similar ibu.
   * @param {number} ibu ibu number.
   * @return {Observable} Observable to subscribe to
   */
  getBeerWithSimilarIbu(ibu:number){
    ibu = Math.round(ibu);
    return this.http.get(`${this.endPoint}beers?ibu_gt=${ibu}&page=1&per_page=3`,{});
  }
  /**
   * GET request to the beer.mock.json file
   * get mock beer data
   * @return {Observable} Observable to subscribe to
   */
  getMockBeerData(){
    return this.http.get('/assets/mock-data/beer.mock.json',{});
  }

}
