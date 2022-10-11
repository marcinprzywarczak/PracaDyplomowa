import { Injectable } from '@angular/core';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser: User;
  isLogged;
  constructor() {
    this.isLogged = localStorage.getItem('isLogged') === 'true';
    this.currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  }

  getUser() {
    return this.currentUser;
  }

  getState(): boolean {
    return this.isLogged;
  }
}
