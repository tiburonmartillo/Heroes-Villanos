import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Apiservice } from '../../services/api.service';
import { fromEvent, from } from 'rxjs';
import { debounceTime, pluck, switchMap, tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Biography } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @ViewChild('inputSearch') inputSearch: ElementRef;
  private url = 'https://superheroapi.com/api.php/271791440634137/search/';
  public HeroInput: Array<any> = [];
  public loading = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.SearchHero();
  }

  public SearchHero() {
    fromEvent(this.inputSearch.nativeElement, 'keyup')
      .pipe(
        tap(() => {
          this.loading = true;
          this.HeroInput = [];
        }),
        pluck('target', 'value'),
        debounceTime(1500),
        switchMap((nombreHeroe) =>
          this.http.get(`${this.url}${nombreHeroe}`).pipe(
            pluck('results'),
            switchMap((resultArray: Array<any>) =>
              from(resultArray).pipe(
                map((hero: any) => {
                  let HeroInfo: any = {
                    response: hero.response,
                    id: hero.id,
                    name: hero.name,
                    powerstats: hero.powerstats,
                    biography: hero.biography,
                    appearance: hero.appearance,
                    work: hero.work,
                    connections: hero.connections,
                    image: hero.image,
                  };
                  return HeroInfo;
                })
              )
            )
          )
        )
      )
      .subscribe(
        (hero: any) => {
          console.log(hero);
          this.HeroInput.push(hero);
          this.loading = false;
        },
        () => this.SearchHero()
      );
  }
}
