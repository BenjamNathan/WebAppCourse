import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { AvailableShootersListComponent } from './available-shooters-list/available-shooters-list.component';
import { FavouritesComponent } from './favourites/favourites.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'availableShooters', component: AvailableShootersListComponent},
    { path: 'messages', component: MessagesComponent},
    { path: 'favourites', component: FavouritesComponent},
    { path: '**', redirectTo: 'home', pathMatch: 'full'}
    // This means that want to match the full home path to the wild card **. ** means anything that doesn't match a previous path
];
