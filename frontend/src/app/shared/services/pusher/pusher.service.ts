import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpXsrfTokenExtractor,
} from '@angular/common/http';
import Pusher, {
  Channel,
  ChannelAuthorizationCallback,
  DeprecatedAuthOptions,
  Options,
} from 'pusher-js';
import { UserService } from '../user/user.service';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PusherService {
  BASE_API_URL: string = environment.apiUrl;
  channel: any;
  options: DeprecatedAuthOptions;
  pusher: Pusher;

  constructor(private http: HttpClient, private userService: UserService) {
    const authorizer = (channel: Channel, options: Options) => {
      return {
        authorize: (
          socketId: string,
          callback: ChannelAuthorizationCallback
        ) => {
          const data = new FormData();
          data.append('socket_id', socketId);
          data.append('channel_name', channel.name);
          this.http
            .post(`${this.BASE_API_URL}/broadcasting/auth`, data, {
              withCredentials: true,
            })
            .subscribe((data: any) => {
              callback(null, data);
            });
        },
      };
    };
    this.pusher = new Pusher('f814e5e56264e6fcdea1', {
      cluster: 'eu',
      authorizer: authorizer,
    });
    this.channel = this.pusher.subscribe(
      `private-chat.${this.userService.getUser().id}`
    );
  }

  sendMessage(message: String) {
    this.http
      .post(
        'http://localhost:8000/api/messages',
        {
          message: message,
        },
        { withCredentials: true }
      )
      .subscribe((res) => {
        console.log('res', res);
      });
  }
}
