import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {


  transform(users: any[], searchText: string): any[] {
    if (!users || !searchText) return users;

    const lowerSearch = searchText.toLowerCase();
    return users.filter(user => {
      return (
        user.id?.toString().includes(lowerSearch) ||
        user.firstName?.toLowerCase().includes(lowerSearch) ||
        user.lastName?.toLowerCase().includes(lowerSearch) ||
        user.age?.toString().includes(lowerSearch) ||
        user.gender?.toLowerCase().includes(lowerSearch) ||
        user.email?.toLowerCase().includes(lowerSearch) ||
        user.phone?.toLowerCase().includes(lowerSearch) ||
        user.address?.address?.toLowerCase().includes(lowerSearch) ||
        user.address?.city?.toLowerCase().includes(lowerSearch) ||
        user.address?.state?.toLowerCase().includes(lowerSearch) ||
        user.address?.stateCode?.toLowerCase().includes(lowerSearch) ||
        user.address?.country?.toLowerCase().includes(lowerSearch) ||
        user.address?.postalCode?.toLowerCase().includes(lowerSearch)
      );
    });
  }
}
