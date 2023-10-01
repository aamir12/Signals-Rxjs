import 'zone.js/dist/zone';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { UserService } from './user.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { IUser } from './model';
import { UserSignalService } from './user-signal.service';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CommonModule],
  //templateUrl: './main-rxjs.html',
  templateUrl: './main-signal.html',
})
export class App {
  fb = inject(FormBuilder);
  addForm = this.fb.nonNullable.group({
    name: '',
  });

  //userService = inject(UserService);
  //users$: Observable<IUser[]> = this.userService.getUsers();

  userSignalService = inject(UserSignalService);
  usersSig = this.userSignalService.getUsers();

  onUserAdd(): void {
    const user: IUser = {
      id: Math.random().toString(),
      name: this.addForm.getRawValue().name,
    };
    // this.userService.addUser(user);
    this.userSignalService.addUser(user);
    this.addForm.reset();
  }

  removeUser(userId: string): void {
    //this.userService.removeUser(userId);
    this.userSignalService.removeUser(userId);
  }
}

bootstrapApplication(App);
