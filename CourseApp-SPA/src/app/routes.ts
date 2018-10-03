import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { AvailableShootersListComponent } from './available-shooters/available-shooters-list/available-shooters-list.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { AuthGuard } from './_guards/auth.guard';
import { AvailableShooterDetailComponent } from './available-shooters/available-shooter-detail/available-shooter-detail.component';
import { AvailableShooterDetailResolver } from './_resolvers/available-shooter-detail.resolver';
import { AvailableShooterListResolver } from './_resolvers/available-shooter-list.resolver';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'messages', component: MessagesComponent},
            { path: 'favourites', component: FavouritesComponent},
            { path: 'available-shooters/:id', component: AvailableShooterDetailComponent, resolve: {user: AvailableShooterDetailResolver} }
            // :id means that a variable is going to be passed in
        ]
    },
    // tslint:disable-next-line:max-line-length
    { path: 'available-shooters', component: AvailableShootersListComponent,
        resolve: {users: AvailableShooterListResolver}, canActivate: [AuthGuard]},
    { path: '**', redirectTo: 'home', pathMatch: 'full'},
    // This means that want to match the full home path to the wild card **. ** means anything that doesn't match a previous path
    // Could put available-shooters in children array but this shows the 2 different methods to implement a guard
    // For larger applications the children array is the better choice
];
