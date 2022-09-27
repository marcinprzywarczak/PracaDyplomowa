import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferComponent } from './components/offer/offer.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { ClickOutsideDirective } from './directives/click-outside/click-outside.directive';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation/click-stop-propagation.directive';

@NgModule({
  declarations: [OfferComponent, ClickOutsideDirective, ClickStopPropagationDirective],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    RippleModule,
    TooltipModule,
  ],
  exports: [OfferComponent, ClickOutsideDirective],
})
export class SharedModule {}
