import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { DetallesComponent } from './components/detalles/detalles.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'search', component: SearchComponent },
    { path: 'detalles:id', component: DetallesComponent },
    { path: '**', pathMatch:'full', redirectTo: 'routePath' }
    
];

export const appRouting = RouterModule.forRoot(routes);