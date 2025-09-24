export interface Employee {
  id: number;
  name: string;
  city: string;
  email: string;
  avatar: string;
  address?: {
    city: string;
  };
}
