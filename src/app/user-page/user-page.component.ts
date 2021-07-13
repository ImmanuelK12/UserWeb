import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  userList: any;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const loginId = this.authService.getLoginUserId();
    if(loginId?.length) {
      this.authService.getUserList()?.forEach((el: any) => {
        if(loginId == el?.id) {
          this.userList = [el];
        }
      });
    }
  }

}
