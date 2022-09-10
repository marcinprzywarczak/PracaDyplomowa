import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss'],
})
export class AddOfferComponent implements OnInit {
  showHouseOption: boolean = false;
  showPlotOption: boolean = false;
  showFlatOption: boolean = false;
  showRoomOption: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
