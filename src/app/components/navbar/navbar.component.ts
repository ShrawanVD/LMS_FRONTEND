import { Component,  } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  ngOnInit(){
    this.userService.profile();
    // localStorage.setItem('userInfo', this.userService.userData.value);
  }

  constructor(public userService:UserService){}



  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logoutBtn(){
    console.log("ts called")
    this.userService.logout();
  }

}
// localStorage.setItem('userInfo', result.authData);


