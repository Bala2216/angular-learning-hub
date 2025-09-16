export interface AdvancedUserFormModel {
    id: number;
    firstName: string;
    lastName: string;
    fullName?: string;
    age?: number;
    gender: string;
    email: string;
    phone: string;
    birthDate: string;
    address?: {
        address?: string;
        city?: string;
        state?: string;
        stateCode?: string;
        postalCode?: string;
        country?: string;
    }
}