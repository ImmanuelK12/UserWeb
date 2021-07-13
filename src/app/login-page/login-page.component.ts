import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginpageModel } from '../model/login.model';
import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginPageForm = new FormGroup({});
  constructor(private authService: AuthService) {
    this.initForm();
   }

   initForm(loginpageModel?: LoginpageModel |  any) {
     let loginModel: any = new LoginpageModel(loginpageModel);
     Object.keys(loginModel).forEach((key: any) => {
       this.loginPageForm.addControl(key, new FormControl(loginModel[key], [Validators.required]));
     });
     this.loginPageForm.get('password')?.setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(20)]);
     this.loginPageForm.get('password')?.updateValueAndValidity();
   }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loginPageForm.get('loginId')?.setValue('');
      this.loginPageForm.get('password')?.setValue('');
      this.loginPageForm.get('loginId')?.markAsUntouched();
      this.loginPageForm.get('password')?.markAsUntouched();
    }, 1000);
  }

  onSubmit() {
    if(!this.loginPageForm?.valid) {
      this.loginPageForm?.markAllAsTouched();
      return;
    }
    const loginList: any =  this.authService.getUserList();
    const loginId: any =  this.authService.getLoginUserId();
    if(loginList?.length) {
      loginList.forEach((el: any) => {
        if((el?.email == this.loginPageForm.get('loginId')?.value || el?.mobilenumber == this.loginPageForm.get('loginId')?.value || el?.username == this.loginPageForm.get('loginId')?.value)
         && el?.password == this.loginPageForm.get('password')?.value) {
          loginId.push(el?.id);
          this.authService.setLoginUserId(loginId);
          this.authService.signIn();
        }
      });
    } else {
      this.authService.goToSignUp();
    }
  }
}
