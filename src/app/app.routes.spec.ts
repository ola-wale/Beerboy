import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { AppComponent } from './app.component';
import { testDeps } from './test.deps';

describe('Routing', () => {
  let location: Location;
  let router: Router;
  let fixture;
  beforeEach(async(() => {
    TestBed.configureTestingModule(testDeps)
    .compileComponents();
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  }));

  it('navigating to an unregistered route should redirect to the base route (/).', fakeAsync(() => {
    router.navigate(['jacksonFive']);
    tick();
    expect(location.path()).toBe('');
  }));

});
