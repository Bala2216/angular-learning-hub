import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService, User } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const mockUsers = [
    { id: 1, name: 'John Doe', username: 'johnd', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', username: 'janes', email: 'jane@example.com' }
  ];

  const mockComments = [
    { id: 1, body: 'Comment for John' },
    { id: 2, body: 'Comment for Jane' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsers', () => {
    it('should fetch users and map comments correctly', () => {
      service.getUsers().subscribe((users: User[]) => {
        expect(users.length).toBe(2);
        expect(users[0].body).toBe('Comment for John');
        expect(users[1].body).toBe('Comment for Jane');
      });

      const usersRequest = httpMock.expectOne(service['usersApi']);
      expect(usersRequest.request.method).toBe('GET');
      usersRequest.flush(mockUsers);

      const commentsRequest = httpMock.expectOne(service['commentsApi']);
      expect(commentsRequest.request.method).toBe('GET');
      commentsRequest.flush(mockComments);
    });

    it('should handle searchText and return filtered users', () => {
      const searchText = 'John';
      service.getUsers(searchText).subscribe((users: User[]) => {
        expect(users.length).toBe(2);
        expect(users[0].name).toContain('John');
      });

      const usersRequest = httpMock.expectOne(`${service['usersApi']}?name_like=${searchText}`);
      expect(usersRequest.request.method).toBe('GET');
      usersRequest.flush(mockUsers);

      const commentsRequest = httpMock.expectOne(service['commentsApi']);
      commentsRequest.flush(mockComments);
    });

    it('should assign default comment if no match found', () => {
      const commentsWithoutMatch = [{ id: 99, body: 'Unrelated comment' }];

      service.getUsers().subscribe((users: User[]) => {
        expect(users[0].body).toBe('No comment available');
      });

      httpMock.expectOne(service['usersApi']).flush(mockUsers);
      httpMock.expectOne(service['commentsApi']).flush(commentsWithoutMatch);
    });
  });

  describe('addUser', () => {
    it('should post user and return created user', () => {
      const newUser: Partial<User> = {
        name: 'New User',
        username: 'newuser',
        email: 'new@example.com'
      };

      const createdUser: User = {
        id: 3,
        name: 'New User',
        username: 'newuser',
        email: 'new@example.com',
        body: 'No comment available'
      };

      service.addUser(newUser).subscribe((user: User) => {
        expect(user).toEqual(createdUser);
      });

      const req = httpMock.expectOne(service['usersApi']);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newUser);
      req.flush(createdUser);
    });
  });
});
