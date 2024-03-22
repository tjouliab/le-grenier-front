import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BedroomDto } from '../dto/bedroom.dto';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  base: string = 'http://localhost:3000/bedrooms';

  constructor(private http: HttpClient) {}

  findAllRooms(): Observable<BedroomDto[]> {
    return this.http.get<BedroomDto[]>(`${this.base}`);
  }
}
