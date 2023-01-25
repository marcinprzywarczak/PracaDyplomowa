import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() message: string;
  @Input() date: string;
  @Input() justify: string = 'justify-start self-start';
  constructor() {}

  ngOnInit(): void {}
}
