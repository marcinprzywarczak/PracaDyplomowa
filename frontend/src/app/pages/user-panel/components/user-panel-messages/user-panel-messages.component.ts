import { Component, OnDestroy, OnInit } from '@angular/core';
import { PusherService } from '../../../../shared/services/pusher/pusher.service';
import { MessageService } from '../../../../shared/services/message-service/message.service';
import { MessageHeader } from '../../../../shared/models/message-header';
import { MessagesTriggerService } from '../../../../shared/services/messages-trigger/messages-trigger.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../../../shared/services/user/user.service';

@Component({
  selector: 'app-user-panel-messages',
  templateUrl: './user-panel-messages.component.html',
  styleUrls: ['./user-panel-messages.component.scss'],
})
export class UserPanelMessagesComponent implements OnInit, OnDestroy {
  constructor(
    private pusherService: PusherService,
    private messageService: MessageService,
    private messagesTriggerService: MessagesTriggerService,
    private userService: UserService
  ) {}
  message: String;
  messages: String[] = [];
  messageHeaders: MessageHeader[] = [];
  currentMessageHeader: MessageHeader;
  dataLoaded: boolean;
  messageHeadersSortTriggerSubscription: Subscription;
  userId: number;
  isUserSender: boolean;
  messageReadTriggerSubscription: Subscription;
  ngOnInit(): void {
    this.userId = this.userService.getUser().id;
    this.listenOnMessages();
    this.messageService.getAllMessages().subscribe({
      next: (result) => {
        this.messageHeaders = result.messages;
        if (this.messageHeaders.length > 0)
          this.currentMessageHeader = this.messageHeaders[0];
        this.dataLoaded = true;
        this.calculateUnreadMessages();
      },
    });

    this.listenOnMessageHeadersSortTrigger();
    this.listenOnMessageRead();
  }

  listenOnMessages() {
    this.pusherService.channel.bind('message-header-sent', (data: any) => {
      this.messageHeaders.unshift(data.messageHeader);
      if (this.messageHeaders.length === 1)
        this.currentMessageHeader = this.messageHeaders[0];
    });
    this.pusherService.channel.bind('message-sent', (data: any) => {
      this.messageHeaders.find(
        (x) => x.id === data.messageHeader.id
      )!.updated_at = data.messageHeader.updated_at;
      if (data.messageHeader.id !== this.currentMessageHeader.id) {
        if (this.userId === data.messageHeader.sender) {
          this.messageHeaders.find(
            (x) => x.id === data.messageHeader.id
          )!.unread_sender_messages += 1;
        } else {
          this.messageHeaders.find(
            (x) => x.id === data.messageHeader.id
          )!.unread_recipient_messages += 1;
        }
      }
      this.sortMessagesHeaders();
    });
  }

  ngOnDestroy() {
    this.messageHeadersSortTriggerSubscription.unsubscribe();
    this.messageReadTriggerSubscription.unsubscribe();
  }

  listenOnMessageHeadersSortTrigger() {
    this.messageHeadersSortTriggerSubscription =
      this.messagesTriggerService.messageHeaderSortTrigger.subscribe(() => {
        this.sortMessagesHeaders();
      });
  }

  listenOnMessageRead() {
    this.messageReadTriggerSubscription =
      this.messagesTriggerService.readMessageTrigger.subscribe(() => {
        this.calculateUnreadMessages();
      });
  }

  sortMessagesHeaders() {
    this.messageHeaders.sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );
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
    this.messagesTriggerService.triggerUnreadMessages(unreadMessages);
  }
}
