import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimService } from '../../services/claim.service';
import { Claim } from '../../modal/claim.model';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-claim-list',
  standalone: true,
  imports: [CommonModule, AgGridAngular, FormsModule],
  templateUrl: './claim-list.component.html',
})
export class ClaimListComponent implements OnInit {
  private claimService: ClaimService = inject(ClaimService);
  selectedType = 'all';
  allClaims: Claim[] = [];
  filteredClaims: Claim[] = [];

  healthClaims: Claim[] = [];
  vehicleClaims: Claim[] = [];
  propertyClaims: Claim[] = [];
  updateSuccess = false;

  healthColumns: ColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    {
      field: 'memberName',
      headerName: 'Member Name',
      editable: true,
      flex: 1,
    },
    {
      field: 'details.hospitalName',
      headerName: 'Hospital Name',
      editable: true,
      flex: 1,
    },
    {
      field: 'details.treatmentDate',
      headerName: 'Treatment Date',
      editable: true,
      flex: 1,
    },
    {
      field: 'details.amount',
      headerName: 'Amount',
      editable: true,
      flex: 1,
    },
  ];

  vehicleColumns: ColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    {
      field: 'memberName',
      headerName: 'Member Name',
      editable: true,
      flex: 1,
    },
    {
      field: 'details.vehicleNumber',
      headerName: 'Vehicle Number',
      editable: true,
      flex: 1,
    },
    {
      field: 'details.accidentDate',
      headerName: 'Accident Date',
      editable: true,
      flex: 1,
    },
    {
      field: 'details.damageDescription',
      headerName: 'Damage Description',
      editable: true,
      flex: 1,
    },
  ];

  propertyColumns: ColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    {
      field: 'memberName',
      headerName: 'Member Name',
      editable: true,
      flex: 1,
    },
    {
      field: 'details.propertyAddress',
      headerName: 'Property Address',
      editable: true,
      flex: 1,
    },
    {
      field: 'details.incidentDate',
      headerName: 'Incident Date',
      editable: true,
      flex: 1,
    },
    {
      field: 'details.lossDescription',
      headerName: 'Loss Description',
      editable: true,
      flex: 1,
    },
  ];

  onCellValueChanged(event: any) {
    const updatedClaim = event.data;
    this.claimService
      .updateClaim(updatedClaim.id, updatedClaim)
      .subscribe(() => {
        this.updateSuccess = true;
        setTimeout(() => {
          this.updateSuccess = false;
        }, 3000);
      });
  }

  ngOnInit() {
    this.claimService.getClaims().subscribe((claims) => { 
      this.allClaims = claims;
      this.filteredClaims = claims;
      this.healthClaims = claims.filter((c) => c.type === 'health');
      this.vehicleClaims = claims.filter((c) => c.type === 'vehicle');
      this.propertyClaims = claims.filter((c) => c.type === 'property');
    });
  }

  filterClaims() {
    if (this.selectedType === 'all') {
      this.filteredClaims = this.allClaims;
    } else {
      this.filteredClaims = this.allClaims.filter(
        (c) => c.type === this.selectedType
      );
    }
  }
}
