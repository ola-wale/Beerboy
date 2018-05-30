import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailComponent, DetailDialogComponent } from './detail.component';
import { PunkApiService } from '../services/punk-api.service';
import { testDeps } from '../test.deps';
import { mockBeerData } from '../beer.mock';
describe('DetailComponent', () => {
  let component: DetailDialogComponent;
  let fixture: ComponentFixture<DetailDialogComponent>;
  let app,
    compiled;

  beforeEach(async(() => {
    TestBed.configureTestingModule(testDeps)
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDialogComponent);
    component = fixture.componentInstance;
    app = fixture.debugElement.componentInstance;
    //mock data
    app.beer = mockBeerData;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('.featured-beer h1 element should contain the beer name', () => {
    app.loaded = true;
    fixture.detectChanges();
    expect(compiled.querySelector('h1').textContent).toBe(app.beer.name);
  });
  it('the spinner should be visible if the loaded variable is false', () => {
    app.loaded = false;
    fixture.detectChanges();
    expect(compiled.querySelector('.load-spinner-parent')).toBeTruthy();
  });
  it('the spinner should be invisible if the loaded variable is true', () => {
    app.loaded = true;
    fixture.detectChanges();
    expect(compiled.querySelector('.load-spinner-parent')).toBeFalsy();
  });
  it('the .featured-beer element should be invisible if the loaded variable is false', () => {
    app.loaded = false;
    fixture.detectChanges();
    expect(compiled.querySelector('.featured-beer')).toBeFalsy();
  });
  it('the .featured-beer element should be visible if the loaded variable is true', () => {
    app.loaded = true;
    fixture.detectChanges();
    expect(compiled.querySelector('.featured-beer')).toBeTruthy();
  });
  it('the .featured-beer img element should have the beer image_url as src and beer name as alt', () => {
    app.loaded = true;
    fixture.detectChanges();
    expect(compiled.querySelector('.featured-beer img').src).toBe(app.beer.image_url);
    expect(compiled.querySelector('.featured-beer img').getAttribute('alt')).toBe(app.beer.name);
  });
  it('the .featured-beer small element should have the beer tagline as textContent', () => {
    app.loaded = true;
    fixture.detectChanges();
    expect(compiled.querySelector('.featured-beer small').textContent).toBe(app.beer.tagline);
  });
  it('the .featured-beer ul.stats elements should have the beer ibu,abv,ebc in the li\'s', () => {
    app.loaded = true;
    fixture.detectChanges();
    expect(compiled.querySelector('.featured-beer ul.stats li:nth-child(1)').textContent.includes(app.beer.ibu)).toBe(true);
    expect(compiled.querySelector('.featured-beer ul.stats li:nth-child(2)').textContent.includes(app.beer.abv)).toBe(true);
    expect(compiled.querySelector('.featured-beer ul.stats li:nth-child(3)').textContent.includes(app.beer.ebc)).toBe(true);
  });
  it('the .featured-beer ul.best-served elements should have the beer food_pairing in the li\'s', () => {
    app.loaded = true;
    fixture.detectChanges();
    for (var i = 1; i <= app.beer.food_pairing.length; i++) {
      expect(compiled.querySelector(`.featured-beer ul.best-served li:nth-child(${i})`).textContent).toBe(` ${app.beer.food_pairing[i - 1]} `);
    }
  });
  it('there should be three app-beer-card components in .similar-beers', () => {
    app.loaded = true;
    fixture.detectChanges();
    expect(compiled.querySelectorAll('.similar-beers app-beer-card').length).toBe(3);
  });
});
