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
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageHeaderComponent } from './components/message-header/message-header.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AvatarModule } from 'primeng/avatar';
import { MessageComponent } from './components/message/message.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [
    OfferComponent,
    ClickOutsideDirective,
    ClickStopPropagationDirective,
    MessageHeaderComponent,
    MessagesComponent,
    MessageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    RippleModule,
    TooltipModule,
    ConfirmDialogModule,
    AvatarModule,
    InputTextModule,
    FormsModule,
    ProgressSpinnerModule,
    InputTextareaModule,
  ],
  exports: [
    OfferComponent,
    ClickOutsideDirective,
    MessageHeaderComponent,
    MessagesComponent,
  ],
})
export class SharedModule {}
