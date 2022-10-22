import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarService } from '../../shared/services/navbar/navbar.service';

@Component({
  selector: 'app-forbidden-page',
  templateUrl: './forbidden-page.component.html',
  styleUrls: ['./forbidden-page.component.scss'],
})
export class ForbiddenPageComponent implements OnInit, OnDestroy {
  constructor(private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.navbarService.hide();
  }

  ngOnDestroy(): void {
    this.navbarService.show();
  }
}
