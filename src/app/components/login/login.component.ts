import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  constructor(private userService: UserService){}

  passwordFieldType: string = 'password'; // Initialize with 'password'
  password: string = ''; // Initialize the password model

  togglePasswordVisibility() {
    // Toggle between 'password' and 'text'
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
  
  userLogin(data:any){
    this.userService.login(data);
  }
}
