import { Component, OnDestroy, OnInit } from '@angular/core';
import { PusherService } from '../../../../shared/services/pusher/pusher.service';
import { Subscription } from 'rxjs';
import { MessagesTriggerService } from '../../../../shared/services/messages-trigger/messages-trigger.service';
import { MessageService } from '../../../../shared/services/message-service/message.service';
import { MessageHeader } from '../../../../shared/models/message-header';
import { UserService } from '../../../../shared/services/user/user.service';

@Component({
  selector: 'app-user-panel-navbar',
  templateUrl: './user-panel-navbar.component.html',
  styleUrls: ['./user-panel-navbar.component.scss'],
})
export class UserPanelNavbarComponent implements OnInit, OnDestroy {
  unreadMessages: number = 0;
  unreadMessagesTrigger: Subscription;
  messageHeaders: MessageHeader[] = [];
  userId: number;
  constructor(
    private pusherService: PusherService,
    private messagesTriggerService: MessagesTriggerService,
    private messageService: MessageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = this.userService.getUser().id;

    this.messageService.getAllMessages().subscribe({
      next: (result) => {
        this.messageHeaders = result.messages;
        this.calculateUnreadMessages();
      },
    });
    this.listenOnUnreadMessagesTrigger();
    this.pusherService.channel.bind('message-sent', (data: any) => {
      this.unreadMessages++;
    });
    this.pusherService.channel.bind('message-header-sent', (data: any) => {
      this.messageHeaders.unshift(data.messageHeader);
      this.unreadMessages++;
    });
  }

  ngOnDestroy(): void {
    this.unreadMessagesTrigger.unsubscribe();
  }
  listenOnUnreadMessagesTrigger() {
    this.unreadMessagesTrigger =
      this.messagesTriggerService.unreadMessages.subscribe((val) => {
        this.unreadMessages = val;
      });
  }

  calculateUnreadMessages() {
    let unreadMessages = 0;
    this.messageHeaders.forEach((x) => {
      if (this.userId === x.sender) {
        unreadMessages += x.unread_sender_messages;
      } else {
        unreadMessages += x.unread_recipient_messages;
      }
    });
    this.unreadMessages = unreadMessages;
  }
}
