import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from './model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users$ = new BehaviorSubject<IUser[]>([]);
  constructor() {}

  getUsers(): Observable<IUser[]> {
    return this.users$.asObservable();
  }

  addUser(user: IUser) {
    const updatedUsers = [...this.users$.getValue(), user];
    this.users$.next(updatedUsers);
  }

  removeUser(id: string) {
    const updatedUsers = this.users$.getValue().filter((user) => user.id != id);
    this.users$.next(updatedUsers);
  }
}
