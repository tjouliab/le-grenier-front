import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Asset,
  BedType,
  BedroomDto,
  RoomPrice,
} from '../../../../dto/bedroom.dto';

@Component({
  selector: 'app-bedroom',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bedroom.component.html',
  styleUrl: './bedroom.component.scss',
})
export class BedroomComponent {
  @Input()
  room: BedroomDto;

  imagesPath: string[];
  bedroomName: string;
  numberPersonMax: number;
  numberSurface: number;
  price: RoomPrice;
  bedType: BedType;
  shortDescription: string;
  assets: Asset[];

  ngOnInit(): void {
    if (!this.room) {
      return;
    }
    this.imagesPath = this.room.imagesPath;
    this.bedroomName = this.room.bedroomName;
    this.numberPersonMax = this.room.numberPersonMax;
    this.numberSurface = this.room.numberSurface;
    this.price = this.room.price;
    this.bedType = this.room.bedType;
    this.shortDescription = this.room.shortDescription;
    this.assets = this.room.assets;
  }
}
