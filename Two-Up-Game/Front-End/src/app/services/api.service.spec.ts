import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ApiService ]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get data', () => {
    const mockResponse = { id: 1, name: 'test' };
    service.getTypeRequest('test').subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('http://localhost:4000/test');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should post data', () => {
    const mockPayload = { name: 'test' };
    const mockResponse = { id: 1, name: 'test' };
    service.postTypeRequest('test', mockPayload).subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('http://localhost:4000/test');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockPayload);
    req.flush(mockResponse);
  });

  it('should put data', () => {
    const mockPayload = { id: 1, name: 'test' };
    const mockResponse = { id: 1, name: 'test_updated' };
    service.putTypeRequest('test/1', mockPayload).subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('http://localhost:4000/test/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockPayload);
    req.flush(mockResponse);
  });
});
