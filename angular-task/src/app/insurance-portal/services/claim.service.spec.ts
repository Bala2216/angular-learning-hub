import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ClaimService } from './claim.service';
import { provideHttpClient } from '@angular/common/http';
import { Claim } from '../modal/claim.model';

describe('ClaimService', () => {
  let service: ClaimService;
  let httpMock: HttpTestingController;

  const mockClaim: Claim = {
    id: 1,
    type: 'health',
    memberName: 'Antony',
    details: {
      hospitalName: 'Appolo',
      treatmentDate: '2025-10-06',
      amount: 10000,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ClaimService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(ClaimService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should submit a claim', () => {
    service.submitClaim(mockClaim).subscribe((response) => {
      expect(response).toEqual(mockClaim);
    });

    const req = httpMock.expectOne('http://localhost:3000/claims');
    expect(req.request.method).toBe('POST');
    req.flush(mockClaim);
  });

  it('should fetch all claims', () => {
    const mockClaims: Claim[] = [mockClaim];
    service.getClaims().subscribe((claims) => {
      expect(claims.length).toBe(1);
      expect(claims).toEqual(mockClaims);
    });

    const req = httpMock.expectOne('http://localhost:3000/claims');
    expect(req.request.method).toBe('GET');
    req.flush(mockClaims);
  });

  it('should update a claim by ID', () => {
    if (mockClaim.id !== undefined) {
      service.updateClaim(mockClaim.id, mockClaim).subscribe((response) => {
        expect(response).toEqual(mockClaim);
      });

      const req = httpMock.expectOne(
        `http://localhost:3000/claims/${mockClaim.id}`
      );
      expect(req.request.method).toBe('PUT');
      req.flush(mockClaim);
    }
  });
});
