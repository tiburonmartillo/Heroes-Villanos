import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {  HeroesServiciosService } from "../../services/heroes-servicios.service";
import { fromEvent } from 'rxjs';
import { debounceTime, pluck, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  @ViewChild('inputsearch') inputsearch:ElementRef;

  public loading:boolean=true;
  public heroeRecibido:any;
  private url=`https://superheroapi.com/api/10213857205424854/`

  constructor(private  http:HttpClient) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  
    
  }
  searchHereo(nombreheroe){
    fromEvent(this.inputsearch.nativeElement,'keyup')
    .pipe(
      debounceTime(1500),
      pluck('target','value'),
      switchMap(nombreheroe => this.http.get(`${this.url}${nombreheroe}`))
      ).subscribe(value=>{this.heroeRecibido=value;
    
  this.loading=false;}
  
  )
    // this.http.get(url).subscribe(pokemonRecibido=>(pokemonRecibido))
    
  }

}
