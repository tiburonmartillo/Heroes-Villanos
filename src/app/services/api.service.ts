import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class Apiservice {

  public APIheroes = `https://superheroapi.com/api/10213857205424854/`;
  constructor(private http: HttpClient) {}

  public ObtenerHeroe(id: number) {

    console.log(`${this.APIheroes}${id}`);

    return this.http.get(`${this.APIheroes}${id}`);
  }
}