import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  templateUrl: './login.html',
})
export class LoginComponent {

  route: string = "aca";
  dashboard: string = "dashboard";

  login(): void {
      console.log('login/submitted');
  }
}
