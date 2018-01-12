import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // form variables
  phone: string;
  password: string;

  constructor(
    private auth: AuthService,
    private flashMessages: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login(credentials) {
    this.auth.authenticateUser(credentials).subscribe(data => {
      if (data.success === true) {
        this.auth.storeUserData(data.token, data.user);
        this.flashMessages.show('Welcome, you are now logged in as - ' + data.user.username ,
          {cssClass: 'green lighten-1', timeout: 3000});
          // redirect to page
        this.router.navigate(['/home']);
      } else {
        this.flashMessages.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }

}
