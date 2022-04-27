import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {finalize} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  test(){
    // this.http.get('http://localhost:8000/sanctum/csrf-cookie').pipe(finalize(() => {
    //   this.http.post('http://localhost:8000/log',
    //   {email: 'test@test.com', password: '12345678'}).subscribe(value => {
    //   console.log(value)})})).subscribe(()=>{
    //   this.http.post('http://localhost:8000/log',
    //     {email: 'test@test.com', password: '12345678'}).subscribe(value => {
    //     console.log(value)})});

    this.http.get('http://localhost:8000/sanctum/csrf-cookie', {withCredentials: true}).subscribe(()=>{
      this.http.post('http://localhost:8000/login',
        {email: 'test@test.com', password: '12345678'}, {withCredentials: true}).subscribe(val=>{
        console.log(val);
      });
    });

    // this.http.post('http://localhost:8000/api/register',
    //   {name: 'test', email: 'test@test.com', password: '12345678', password_confirmation:'12345678'}).subscribe(()=>{
    //   console.log('test');
    // });
    //

    // this.http.post('http://localhost:8000/login',
    //     {email: 'test@test.com', password: '12345678'}).subscribe(()=>{
    //     console.log('test');
    //   });

  }

  test2(){
    this.http.get('http://localhost:8000/api/user', {withCredentials: true}).subscribe(val=>{
      console.log(val)});
  }

  wyloguj(){
    this.http.get('http://localhost:8000/sanctum/csrf-cookie', {withCredentials: true}).subscribe(()=>{
      this.http.post('http://localhost:8000/logout',{}, {withCredentials: true}).subscribe();
    });
  }
}
