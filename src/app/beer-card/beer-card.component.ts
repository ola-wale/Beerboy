import { Component, OnInit,Input } from '@angular/core';
import { Beer } from '../interfaces/beer.interface';

@Component({
  selector: 'app-beer-card',
  templateUrl: './beer-card.component.html',
  styleUrls: ['./beer-card.component.scss']
})
export class BeerCardComponent implements OnInit {
  @Input('beer') beer:Beer;
  @Input('classes') classes:String[];
  constructor() { }

  ngOnInit() {}

}
