import { Component, OnInit } from '@angular/core';
import { HeroesServiciosService } from "../../services/heroes-servicios.service";
import { concatMap, map, pluck } from "rxjs/operators";
import { from } from "rxjs";
import { Powerstats, RootObject } from "../../interfaces/heroe.interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public indicePaginacion = 1;
  public pageHero: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  
  public ArrayHeroes: Array<any> = [];

  public loading: boolean = false;


  constructor(
    private HeroService: HeroesServiciosService
  ) {
    this.getSuperHero();
    
  }
  
  ngOnInit(): void {}
  
  public getSuperHero() {
    
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
          this.ArrayHeroes.push(hero)
          console.log(this.ArrayHeroes);
        })
  }

  public paginacionRight() {
    this.indicePaginacion++;

    for (let x = 0; x < this.pageHero.length; x++) {
      this.pageHero[x] += 12;
    }
    console.log(this.pageHero);

    this.getSuperHero();
  }

  public paginacionLeft() {
    if (this.indicePaginacion == 1) return;
    for (let x = 0; x < this.pageHero.length; x++) {
      this.pageHero[x] -= 12;
    }
    console.log(this.pageHero);

    this.indicePaginacion--;
    this.getSuperHero();

  }
}