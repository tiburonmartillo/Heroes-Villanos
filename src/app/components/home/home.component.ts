import { Component, OnInit } from '@angular/core';
import { Apiservice } from "../../services/api.service";
import { concatMap, map, pluck, switchMap } from "rxjs/operators";
import { from } from "rxjs";
import { Powerstats, RootObject } from "../../interfaces/heroe.interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public paginas = 1;
  public pageHero: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8];
  
  public ArrayHeroes: Array<any> = [];

  public loading: boolean = false;


  constructor(
    private HeroService: Apiservice
  ) {
    this.getSuperHero();
    
  }
  
  ngOnInit(): void {}
  
  public getSuperHero() {
    this.ArrayHeroes=[];
    this.loading=false;
    from(this.pageHero).pipe(
      concatMap((id:number) =>  this.HeroService.ObtenerHeroe(id).pipe(
        map((hero:RootObject)=>{
          let HeroInfo:RootObject={
            response: hero.response,
            id: hero.id,
            name:hero.name,
            powerstats:hero.powerstats,
            biography: hero.biography,
            appearance: hero.appearance,
            work: hero.work,
            connections: hero.connections,
            image:hero.image
          }
          return HeroInfo
          
        })
        ))
        ).subscribe((hero:RootObject)=>{
          this.ArrayHeroes.push(hero);
          if(this.ArrayHeroes.length==this.pageHero.length){
            console.log('cargando')
            this.loading = false;
          }
        })
        console.log(this.ArrayHeroes);
  }

  public paginacionRight() {
    this.paginas++;

    for (let x = 0; x < this.pageHero.length; x++) {
      this.pageHero[x] += 8;
    }
    console.log(this.pageHero);

    this.getSuperHero();
  }

  public paginacionLeft() {
    if (this.paginas == 1) return;
    for (let x = 0; x < this.pageHero.length; x++) {
      this.pageHero[x] -= 8;
    }
    console.log(this.pageHero);

    this.paginas--;
    this.getSuperHero();

  }
}