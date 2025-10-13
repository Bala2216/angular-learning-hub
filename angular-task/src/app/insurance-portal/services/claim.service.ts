import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Claim } from "../modal/claim.model";

@Injectable({ providedIn: 'root' })

export class ClaimService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/claims';

  submitClaim(claim: Claim): Observable<Claim> {
    return this.http.post<Claim>(this.apiUrl, claim);
  }

  getClaims(): Observable<Claim[]> {
    return this.http.get<Claim[]>(this.apiUrl);
  }

  updateClaim(id: number, claim: Claim): Observable<Claim> {
    return this.http.put<Claim>(`${this.apiUrl}/${id}`, claim);
  }
}
