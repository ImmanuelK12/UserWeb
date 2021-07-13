import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(private router: Router) {}

    signIn() {
        window.alert('Login is successful');
        this.router.navigate(['./../user']);
    }

    goToSignIn() {
      this.router.navigate(['./../login']);
    }

    goToSignUp() {
      window.alert('No user is exist');
      if(window.confirm('Are you sure want to go to register page?')) {
        this.router.navigate(['./../register']);
      } 
    }

    signUp() {
        window.alert('User is registered successfully');
        this.router.navigate(['./../login']);
    }

    logout() {
        sessionStorage.removeItem('loginId');
    }

    goToUserPage() {
        this.router.navigate(['./../user']);
    }

    getUserList() {
        return JSON.parse(localStorage.getItem('userList') || '[]');
    }

    setUserList(userStorage: any) {
        localStorage.setItem('userList', JSON.stringify(userStorage))
    }

    getLoginUserId() {
        return JSON.parse(sessionStorage.getItem('loginId') || '[]');
    }

    setLoginUserId(loginId: any) {
        sessionStorage.setItem('loginId', JSON.stringify(loginId))
    }
}