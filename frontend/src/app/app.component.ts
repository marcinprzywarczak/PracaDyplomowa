import { Component } from '@angular/core';
import { RouteService } from './shared/services/route/route.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';
  constructor(private routeService: RouteService) {}
}
