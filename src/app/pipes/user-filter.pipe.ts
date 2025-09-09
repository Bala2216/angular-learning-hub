import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../services/user.service';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {
  transform(users: User[], searchText: string): User[] {
    if (!users || !searchText) return users;
    return users.filter(user =>
      user.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
