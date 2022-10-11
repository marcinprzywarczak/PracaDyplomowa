import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesTriggerService {
  messageHeaderSortTrigger = new Subject<boolean>();
  unreadMessages = new Subject<number>();
  readMessageTrigger = new Subject<boolean>();
  constructor() {}

  triggerMessageHeaderSort() {
    this.messageHeaderSortTrigger.next(true);
  }

  triggerUnreadMessages(unreadMessages: number) {
    this.unreadMessages.next(unreadMessages);
  }

  triggerReadMessage() {
    this.readMessageTrigger.next(true);
  }
}
