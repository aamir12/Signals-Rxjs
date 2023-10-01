import { Injectable, Signal, computed, signal } from '@angular/core';
import { IUser } from './model';

@Injectable({
  providedIn: 'root',
})
export class UserSignalService {
  private usersSig = signal<IUser[]>([]);

  getUsers(): Signal<IUser[]> {
    return computed(this.usersSig);
  }

  addUser(user: IUser): void {
    this.usersSig.update((users) => [...users, user]);
  }

  removeUser(userId: string): void {
    const updatedUsers = this.usersSig().filter((user) => user.id !== userId);
    this.usersSig.set(updatedUsers);
  }
}
