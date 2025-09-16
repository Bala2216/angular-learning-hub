export interface EmployeeData {
  name: string;
  email: string;
  department: string;
  employmentType: string;
  gender: string;
  role?: string;
}

export interface Role {
  it: string;
  accounts: string;
  management: string
}
