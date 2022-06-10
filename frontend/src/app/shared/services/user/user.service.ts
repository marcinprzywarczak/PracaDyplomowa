import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser;
  isLogged;
  constructor() {
    this.isLogged = localStorage.getItem('isLogged') === 'true';
    this.currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  }

  getUser() {
    return this.currentUser;
  }

  getState() {
    return this.isLogged;
  }
}
