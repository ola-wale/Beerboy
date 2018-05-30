import { TestBed, async } from '@angular/core/testing';
import { AppModule } from './app.module';
import { HttpModule } from '@angular/http';
import { testDeps } from './test.deps';
import { AppComponent } from './app.component';
describe('AppComponent', () => {
  var app,
      fixture,
      compiled;
  beforeEach(async(() => {
    TestBed.configureTestingModule(testDeps).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    spyOn(app, 'loadBeers');
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;

  }));
  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Beerboy'`, async(() => {
    expect(app.title).toEqual('Beerboy');
  }));
  it('should render title in a h1 tag in the header', async(() => {
    fixture.detectChanges();
    expect(compiled.querySelector('header h1').textContent).toContain(app.title);
  }));
  it('the beers loadBeers method should have been called', async(() => {
    expect(app.loadBeers).toHaveBeenCalled();
  }));
  it('expect loading spinner to be visible', async(() => {
    expect(compiled.querySelector('.load-spinner-parent')).toBeTruthy();
  }));
  it('expect loading spinner to be visible if the loaded variable is false', async(() => {
    app.loaded = false;
    fixture.detectChanges();
    expect(compiled.querySelector('.load-spinner-parent mat-spinner')).toBeTruthy();
  }));
  it('expect loading spinner to be invisible if the loaded variable is true', async(() => {
    app.loaded = true;
    fixture.detectChanges();
    expect(compiled.querySelector('.load-spinner-parent mat-spinner')).toBeFalsy();
  }));
  it('expect .load-count load count to be visible if the loaded variable is true', async(() => {
    app.loaded = true;
    fixture.detectChanges();
    expect(compiled.querySelector('.load-spinner-parent .load-count')).toBeTruthy();
  }));
  it('expect .load-count load count to be invisible if the loaded variable is false', async(() => {
    app.loaded = false;
    fixture.detectChanges();
    expect(compiled.querySelector('.load-spinner-parent .load-count')).toBeFalsy();
  }));
});
