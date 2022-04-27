import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ApiService} from "../shared/services/api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: [],
      haslo: [],
    })
  }
  get f() {
    return this.form.controls;
  }
  onSubmit(){
    this.apiService.test();
    console.log('test');
  }

  test2(){
    this.apiService.test2();
  }

  wyloguj(){
    this.apiService.wyloguj();
  }
}
