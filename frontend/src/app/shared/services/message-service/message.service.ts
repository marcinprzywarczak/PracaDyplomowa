import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { MessageHeader } from '../../models/message-header';
import { Message } from '../../models/message';
import { NewMessage } from '../../models/new-message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  BASE_API_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  sendMessage(message: NewMessage) {
    return this.http.post(
      `${this.BASE_API_URL}/api/messages/sendNewMessage`,
      message,
      {
        withCredentials: true,
      }
    );
  }

  getAllMessages() {
    return this.http.post<{ messages: MessageHeader[] }>(
      `${this.BASE_API_URL}/api/messages/getAllMessages`,
      {},
      { withCredentials: true }
    );
  }

  replyMessage(message: String, messageHeaderId: number) {
    return this.http.post<{ message: Message }>(
      `${this.BASE_API_URL}/api/messages/replyMessage`,
      {
        message: message,
        messageHeaderId: messageHeaderId,
      },
      { withCredentials: true }
    );
  }

  getMessageForHeader(messageHeaderId: number) {
    return this.http.post<{ messages: Message[] }>(
      `${this.BASE_API_URL}/api/messages/getMessagesForHeader`,
      {
        messageHeaderId: messageHeaderId,
      },
      { withCredentials: true }
    );
  }

  setMessagesStatus(messageHeaderId: number) {
    return this.http.post<{ messages: Message[] }>(
      `${this.BASE_API_URL}/api/messages/setMessagesStatus`,
      {
        messageHeaderId: messageHeaderId,
      },
      { withCredentials: true }
    );
  }
}
