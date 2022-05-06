import {Component, HostListener, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LoginService} from "../../shared/services/login/login.service";
import {finalize} from "rxjs";
import {UserService} from "../../shared/services/user/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLogged: boolean;
  user: any;
  firstName = "Jan";
  sureName = "Kowalski";
  avatarUrl = "../../assets/default_avatar.jpg";
  userDropdown: boolean = false;
  constructor(private loginService: LoginService, private userService: UserService) { }

  ngOnInit(): void {
    this.isLogged = this.userService.getState();
    this.user = this.userService.getUser();
    console.log('on init', this.isLogged);
  }


  showMobileMenu() {
    const menu = document.querySelector(".mobile-menu")!;

    menu.classList.toggle("hidden");

  }

  dropdownHouse(){
    const dropdown = document.querySelector("#dropdown-content-house")!;
    dropdown.classList.toggle("hidden");
  }

  dropdownHouseMobile(){
    const dropdown = document.querySelector("#dropdown-content-house-mobile")!;
    dropdown.classList.toggle("hidden");
  }

  dropdownPlot(){
    const dropdown = document.querySelector("#dropdown-content-plot")!;
    dropdown.classList.toggle("hidden");
  }

  dropdownPlotMobile(){
    const dropdown = document.querySelector("#dropdown-content-plot-mobile")!;
    dropdown.classList.toggle("hidden");
  }

  dropdownFlat(){
    const dropdown = document.querySelector("#dropdown-content-flat")!;
    dropdown.classList.toggle("hidden");
  }
  dropdownFlatMobile(){
    const dropdown = document.querySelector("#dropdown-content-flat-mobile")!;
    dropdown.classList.toggle("hidden");
  }

  dropdownWarehouse(){
    const dropdown = document.querySelector("#dropdown-content-warehouse")!;
    dropdown.classList.toggle("hidden");
  }
  dropdownWarehouseMobile(){
    const dropdown = document.querySelector("#dropdown-content-warehouse-mobile")!;
    dropdown.classList.toggle("hidden");
  }

  dropdownRoom(){
    const dropdown = document.querySelector("#dropdown-content-room")!;
    dropdown.classList.toggle("hidden");
  }
  dropdownRoomMobile(){
    const dropdown = document.querySelector("#dropdown-content-room-mobile")!;
    dropdown.classList.toggle("hidden");
  }

  dropdownOffice(){
    const dropdown = document.querySelector("#dropdown-content-office")!;
    dropdown.classList.toggle("hidden");
  }
  dropdownOfficeMobile(){
    const dropdown = document.querySelector("#dropdown-content-office-mobile")!;
    dropdown.classList.toggle("hidden");
  }

  dropdownUser(){
    const dropdown = document.querySelector("#dropdown-content-user")!;
    dropdown.classList.toggle("hidden");
    console.log('test user');
  }

  dropdownUserMobile(){
    const dropdown = document.querySelector("#dropdown-content-user-mobile")!;
    dropdown.classList.toggle("hidden");
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent){
    if(!(event.target == document.getElementById("dropdown-plot"))){
      const menu = document.querySelector("#dropdown-content-plot")!;
      if(!menu.classList.contains("hidden"))
        menu.classList.toggle("hidden");
    }

    if(!(event.target == document.getElementById("dropdown-plot-mobile"))){
      const menu = document.querySelector("#dropdown-content-plot-mobile")!;
      if(!menu.classList.contains("hidden"))
        menu.classList.toggle("hidden");
    }


    if(!(event.target == document.getElementById("dropdown-house"))){
      const menu = document.querySelector("#dropdown-content-house")!;
      if(!menu.classList.contains("hidden"))
        menu.classList.toggle("hidden");
    }
    if(!(event.target == document.getElementById("dropdown-house-mobile"))){
      const menu = document.querySelector("#dropdown-content-house-mobile")!;
      if(!menu.classList.contains("hidden"))
        menu.classList.toggle("hidden");
    }

    if(!(event.target == document.getElementById("dropdown-flat"))){
      const menu = document.querySelector("#dropdown-content-flat")!;
      if(!menu.classList.contains("hidden"))
        menu.classList.toggle("hidden");
    }

    if(!(event.target == document.getElementById("dropdown-warehouse"))){
      const menu = document.querySelector("#dropdown-content-warehouse")!;
      if(!menu.classList.contains("hidden"))
        menu.classList.toggle("hidden");
    }

    if(!(event.target == document.getElementById("dropdown-room"))){
      const menu = document.querySelector("#dropdown-content-room")!;
      if(!menu.classList.contains("hidden"))
        menu.classList.toggle("hidden");
    }

    if(!(event.target == document.getElementById("dropdown-office"))){
      const menu = document.querySelector("#dropdown-content-office")!;
      if(!menu.classList.contains("hidden"))
        menu.classList.toggle("hidden");
    }

    if(!(event.target == document.getElementById("dropdown-flat-mobile"))){
      const menu = document.querySelector("#dropdown-content-flat-mobile")!;
      if(!menu.classList.contains("hidden"))
        menu.classList.toggle("hidden");
    }

    if(!(event.target == document.getElementById("dropdown-warehouse-mobile"))){
      const menu = document.querySelector("#dropdown-content-warehouse-mobile")!;
      if(!menu.classList.contains("hidden"))
        menu.classList.toggle("hidden");
    }

    if(!(event.target == document.getElementById("dropdown-room-mobile"))){
      const menu = document.querySelector("#dropdown-content-room-mobile")!;
      if(!menu.classList.contains("hidden"))
        menu.classList.toggle("hidden");
    }

    if(!(event.target == document.getElementById("dropdown-office-mobile"))){
      const menu = document.querySelector("#dropdown-content-office-mobile")!;
      if(!menu.classList.contains("hidden"))
        menu.classList.toggle("hidden");
    }

    if(!(event.target == document.querySelector("#dropdown-user"))
    && !(event.target == document.querySelector("#dropdown-user-img"))
    && !(event.target == document.querySelector("#dropdown-user-name")) && this.isLogged){
      const menu = document.querySelector("#dropdown-content-user")!;
      if(!menu.classList.contains("hidden"))
         menu.classList.toggle("hidden");
    }

    if(!(event.target == document.querySelector("#dropdown-user-mobile"))
      && !(event.target == document.querySelector("#dropdown-user-img-mobile"))
      && !(event.target == document.querySelector("#dropdown-user-name-mobile")) && this.isLogged){
      const menu = document.querySelector("#dropdown-content-user-mobile")!;
      if(!menu.classList.contains("hidden"))
        menu.classList.toggle("hidden");
    }
  }
  logout(){
    console.log('test');
    this.loginService.logout().pipe(finalize(() => {
      window.location.reload();
    })).subscribe(response => {
      if(response.status === 204){
        localStorage.removeItem('isLogged');
        localStorage.removeItem('user');
      }
    });
  }
}