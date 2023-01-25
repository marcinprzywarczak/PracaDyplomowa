import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MessageHeader } from '../../models/message-header';
import { UserService } from '../../services/user/user.service';
import { MessageService } from '../../services/message/message.service';
import { PusherService } from '../../services/pusher/pusher.service';
import { Message } from '../../models/message';
import { MessagesTriggerService } from '../../services/messages-trigger/messages-trigger.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent
  implements OnInit, AfterViewInit, AfterViewChecked, OnChanges
{
  @Input() messageHeader: MessageHeader;
  @ViewChild('messagesDiv') messagesDiv: ElementRef;
  messages: Message[];
  userId: number;
  isUserSender: boolean;
  message: string = '';
  loading: boolean = false;
  justify: string = '';
  scrolled: boolean;
  dataLoaded: boolean;
  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private pusherService: PusherService,
    private messagesTriggerService: MessagesTriggerService
  ) {}

  ngOnInit(): void {
    this.pusherService.channel.bind('message-sent', (data: any) => {
      if (this.messageHeader.id === data.messageHeader.id)
        this.messages.push(data.message);
      if (this.userId === this.messageHeader.sender) {
        this.messageHeader.unread_sender_messages = 0;
      } else {
        this.messageHeader.unread_recipient_messages = 0;
      }
    });
    this.userId = this.userService.getUser().id;

    this.isUserSender = this.userId === this.messageHeader.sender;
    this.getMessages();
  }
  ngAfterViewInit(): void {
    this.scrollToBottom();
    this.calculateUnreadMessages();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setMessagesStatus();
    if (changes.messageHeader.firstChange) return;
    this.dataLoaded = false;
    this.getMessages();
    this.calculateUnreadMessages();
  }

  sendMessage() {
    if (this.message === '') return;
    this.loading = true;
    this.messageService
      .replyMessage(this.message, this.messageHeader.id)
      .subscribe({
        next: (result) => {
          this.messageHeader.updated_at = new Date().toISOString();
          this.message = '';
          this.messagesTriggerService.triggerMessageHeaderSort();
          this.messagesTriggerService.triggerReadMessage();
          this.messages.push(result.message);
          this.loading = false;
        },
        error: (err) => {
          console.log(err);
          this.message = '';
          this.loading = false;
        },
      });
  }

  scrollToBottom(): void {
    if (!this.messagesDiv) return;
    this.messagesDiv.nativeElement.scrollTop =
      this.messagesDiv.nativeElement.scrollHeight;
  }

  getMessages() {
    this.messageService.getMessageForHeader(this.messageHeader.id).subscribe({
      next: (value) => {
        this.messages = value.messages;
        this.dataLoaded = true;
      },
      error: (err) => {},
    });
  }

  setMessagesStatus() {
    this.messageService.setMessagesStatus(this.messageHeader.id).subscribe({
      next: (value) => {},
      error: (err) => {},
    });
  }

  calculateUnreadMessages() {
    if (this.userId === this.messageHeader.sender) {
      this.messageHeader.unread_sender_messages = 0;
    } else {
      this.messageHeader.unread_recipient_messages = 0;
    }
    this.messagesTriggerService.triggerReadMessage();
  }
}
