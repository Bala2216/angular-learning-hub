import { Component, inject, signal } from '@angular/core';
import { Claim } from '../../modal/claim.model';
import { ClaimService } from '../../services/claim.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-claim-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './claim-form.component.html',
})
export class ClaimFormComponent {
  claimType = signal<'health' | 'vehicle' | 'property'>('health');
  memberName = signal('');
  details = signal<any>({});
  submitted = signal(false);

  private claimService: ClaimService = inject(ClaimService);

  submit() {
    const claim: Claim = {
      type: this.claimType(),
      memberName: this.memberName(),
      details: this.details(),
    };
    this.claimService
      .submitClaim(claim)
      .subscribe(() => {
        this.submitted.set(true);

        // Reset form fields
        this.claimType.set('health');
        this.memberName.set('');
        this.details.set({});
      });
  }
}
