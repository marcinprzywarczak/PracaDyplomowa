import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferComponent } from './components/offer/offer.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { ClickOutsideDirective } from './directives/click-outside/click-outside.directive';

@NgModule({
  declarations: [OfferComponent, ClickOutsideDirective],
  imports: [CommonModule, RouterModule],
  exports: [OfferComponent, ClickOutsideDirective],
})
export class SharedModule {}
