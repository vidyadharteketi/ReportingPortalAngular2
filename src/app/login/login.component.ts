import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  moduleId: module.id,
  templateUrl: './login.html',
})
export class LoginComponent {



  route = 'reporting';
  dashboard = 'dashboard';

  constructor(private _router: Router) {

  }

  login(): void {
 this._router.navigate(['/reporting/dashboard']);
    console.log('login/submitted');
  }
}
