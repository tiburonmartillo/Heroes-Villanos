import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HeroesServiciosService } from "../../services/heroes-servicios.service";
import { concatMap, map } from "rxjs/operators";
import { from } from "rxjs";

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
    private http: HttpClient,
    private HeroService: HeroesServiciosService
  ) {
    this.getSuperHero();
  }

  ngOnInit(): void {}

  public getSuperHero() {
    this.ArrayHeroes = [];

    this.loading = true;
    from(this.pageHero)
      .pipe(
        concatMap((id: number) =>
          this.HeroService.ObtenerHeroe(id).pipe(
            map((hero: any) => {
              return {
                HeroName: hero.name,
                HeroImage: hero.image.url,
                HeroId: hero.id,
              };
            })
          )
        )
      )
      .subscribe((heroInformation: any) => {
        this.loading = false;
        console.log(heroInformation);
        this.ArrayHeroes.push(heroInformation);
        console.log(heroInformation);
        
      });
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