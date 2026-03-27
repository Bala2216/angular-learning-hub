import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../services/user.service';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {
  transform(users: User[], searchText: string): User[] {
    if (!users || !searchText?.trim()) return users;

    const lowerSearch = searchText.toLowerCase().trim();

    return users.filter(user =>
      user.name.toLowerCase().includes(lowerSearch) ||
      user.username.toLowerCase().includes(lowerSearch) ||
      user.email.toLowerCase().includes(lowerSearch)
    );
  }
}
