import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../interfaces/user';

@Pipe({
  name: 'userFilter',
})
export class UserFilterPipe implements PipeTransform {
  transform(users: User[], searchText: string): any[] {
    if (!users || !searchText) {
      return users;
    }

    searchText = searchText.toLowerCase();

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchText) ||
        user.phone.toLowerCase().includes(searchText) ||
        user.address.city.toLowerCase().includes(searchText)
    );
  }
}
