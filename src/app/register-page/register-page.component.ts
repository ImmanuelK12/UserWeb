import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RegisterModel } from '../model/register.model';
import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  unamePattern = "^[a-zA-Z0-9_]{8,15}$";
  pwdPattern = "^[a-zA-Z0-9]{8,20}$";
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  registerPage = new FormGroup ({});
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.registerPage.get('username')?.setValue('');
      this.registerPage.get('email')?.setValue('');
      this.registerPage.get('password')?.setValue('');
      this.registerPage.get('username')?.markAsUntouched();
      this.registerPage.get('email')?.markAsUntouched();
      this.registerPage.get('password')?.markAsUntouched();
    }, 1000);
  }

  initForm(registerModel?: RegisterModel |  any) {
    let registerPageModel: any = new RegisterModel(registerModel);
    Object.keys(registerPageModel).forEach((key: any) => {
      this.registerPage.addControl(key, new FormControl(registerPageModel[key], [Validators.required]));
    });
    this.registerPage.get('username')?.setValidators(Validators.compose([this.registerPage.get('username')?.validator, Validators.pattern(this.unamePattern)]));
    this.registerPage.get('username')?.updateValueAndValidity();
    this.registerPage.get('email')?.setValidators(Validators.compose([this.registerPage.get('email')?.validator, Validators.email]));
    this.registerPage.get('email')?.updateValueAndValidity();
    this.registerPage.get('mobilenumber')?.setValidators(Validators.compose([this.registerPage.get('mobilenumber')?.validator, Validators.minLength(10), Validators.maxLength(10)]));
    this.registerPage.get('mobilenumber')?.updateValueAndValidity();
    this.registerPage.get('password')?.setValidators(Validators.compose([this.registerPage.get('password')?.validator, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(this.pwdPattern)]));
    this.registerPage.get('password')?.updateValueAndValidity();
    this.registerPage.get('confirmpassword')?.setValidators(Validators.compose([this.registerPage.get('confirmpassword')?.validator, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(this.pwdPattern)]));
    this.registerPage.get('confirmpassword')?.updateValueAndValidity();
    this.registerPage.get('address')?.setValidators(Validators.compose([this.registerPage.get('address')?.validator, Validators.minLength(30)]));
    this.registerPage.get('address')?.updateValueAndValidity();
    this.registerPage.get('id')?.clearValidators();
    this.registerPage.get('id')?.updateValueAndValidity();
  }

  onSubmit() {
    if(!this.registerPage?.valid) {
      this.registerPage?.markAllAsTouched();
      return;
    }
    if(this.registerPage?.get('password')?.value != this.registerPage?.get('confirmpassword')?.value) {
      this.registerPage?.markAllAsTouched();
      return;
    }
    let userStorage = this.authService.getUserList();
    this.registerPage.get('id')?.setValue(userStorage?.length);
    userStorage.push(this.registerPage.value);
    this.authService.setUserList(userStorage);
    this.authService.signUp();
  }
}