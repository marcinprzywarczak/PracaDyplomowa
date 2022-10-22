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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FirmUserFormComponent } from './components/firm-user-form/firm-user-form.component';
import { InputMaskModule } from 'primeng/inputmask';
import { PasswordModule } from 'primeng/password';
import { FirmEditFormComponent } from './components/firm-edit-form/firm-edit-form.component';
import { UserChangePasswordFormComponent } from './components/user-change-password-form/user-change-password-form.component';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  declarations: [
    OfferComponent,
    ClickOutsideDirective,
    ClickStopPropagationDirective,
    MessageHeaderComponent,
    MessagesComponent,
    MessageComponent,
    FirmUserFormComponent,
    FirmEditFormComponent,
    UserChangePasswordFormComponent,
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
    ReactiveFormsModule,
    InputMaskModule,
    PasswordModule,
  ],
  exports: [
    OfferComponent,
    ClickOutsideDirective,
    MessageHeaderComponent,
    MessagesComponent,
    FirmUserFormComponent,
    FirmEditFormComponent,
    UserChangePasswordFormComponent,
    NgxPermissionsModule,
  ],
})
export class SharedModule {}
