import { Component, Input, OnInit } from '@angular/core';
import { MessageHeader } from '../../models/message-header';
import { Photo } from '../../models/photo';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-message-header',
  templateUrl: './message-header.component.html',
  styleUrls: ['./message-header.component.scss'],
})
export class MessageHeaderComponent implements OnInit {
  @Input() messageHeader: MessageHeader;
  @Input() active: boolean;

  mainPhoto: Photo;
  userId: number;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.mainPhoto = this.messageHeader.offer.photos?.find(
      (x) => x.pivot.isMain === 1
    )!;
    this.userId = this.userService.getUser().id;
  }
}
