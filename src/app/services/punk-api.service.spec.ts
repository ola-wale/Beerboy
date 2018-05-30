import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { PunkApiService } from './punk-api.service';

import { testDeps } from '../test.deps';
describe('PunkApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(testDeps);
  });

  it('should be created', inject([PunkApiService], (service: PunkApiService) => {
    expect(service).toBeTruthy();
  }));
  it('endPoint should be defined', inject([PunkApiService], (service: PunkApiService) => {
    expect(service.endPoint).toBeTruthy();
  }));
  it('beerPerPage should be 20', inject([PunkApiService], (service: PunkApiService) => {
    expect(service.beerPerPage).toBe(20);
  }));
});
