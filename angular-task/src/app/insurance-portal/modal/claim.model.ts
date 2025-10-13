export interface Claim {
  id?: number;
  type: 'health' | 'vehicle' | 'property';
  memberName: string;
  details: HealthClaim | VehicleClaim | PropertyClaim;
}

export interface HealthClaim {
  hospitalName: string;
  treatmentDate: string;
  amount: number;
}

export interface VehicleClaim {
  vehicleNumber: string;
  accidentDate: string;
  damageDescription: string;
}

export interface PropertyClaim {
  propertyAddress: string;
  incidentDate: string;
  lossDescription: string;
}

export interface Employee {
  id: number;
  name: string;
  email: string;
}
