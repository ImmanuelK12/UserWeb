import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-project';
  constructor(private authService: AuthService) {
  }

  ngOnInit(){
    if(this.authService.getLoginUserId()?.length) {
      this.authService.goToUserPage();
    } else {
      this.authService.goToSignIn();
    }
  }
}
