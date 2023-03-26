import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InterceptorService } from './interceptor-service.service';

describe('InterceptorService', () => {
  let service: InterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InterceptorService]
        });
    service = TestBed.inject(InterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
