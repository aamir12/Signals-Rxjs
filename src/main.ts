import 'zone.js/dist/zone';
import { Component, importProvidersFrom, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { UserService } from './user.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ArticleInterface, IUser } from './model';
import { UserSignalService } from './user-signal.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

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

  //Combination of both RXJS and UserSignalService
  http = inject(HttpClient);
  searchSig = signal<string>('');
  articles$ = toObservable(this.searchSig).pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((searchValue) =>
      this.http.get<ArticleInterface[]>(
        `http://localhost:3004/articles?title_like=${searchValue}`
      )
    )
  );
  articlesSig = toSignal(this.articles$);

  search(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchSig.set(value);
  }
}

bootstrapApplication(App, {
  providers: [provideHttpClient()], //new way to import HttpClientModule
});
