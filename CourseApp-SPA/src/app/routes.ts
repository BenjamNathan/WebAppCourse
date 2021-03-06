import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { AvailableShootersListComponent } from './available-shooters/available-shooters-list/available-shooters-list.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { AuthGuard } from './_guards/auth.guard';
import { AvailableShooterDetailComponent } from './available-shooters/available-shooter-detail/available-shooter-detail.component';
import { AvailableShooterDetailResolver } from './_resolvers/available-shooter-detail.resolver';
import { AvailableShooterListResolver } from './_resolvers/available-shooter-list.resolver';
import { AvailableShooterEditComponent } from './available-shooters/available-shooter-edit/available-shooter-edit.component';
import { AvailableShooterEditResolver } from './_resolvers/available-shooter-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { FavouritesResolver } from './_resolvers/favourites.resolver';
import { MessagesResolver } from './_resolvers/messages.resolver';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'available-shooters/:id', component: AvailableShooterDetailComponent, resolve: {user: AvailableShooterDetailResolver} },
            // :id means that a variable is going to be passed in
            { path: 'available-shooter/edit', component: AvailableShooterEditComponent,
                resolve: {user: AvailableShooterEditResolver}, canDeactivate: [PreventUnsavedChanges] },
            { path: 'messages', component: MessagesComponent, resolve: { messages: MessagesResolver}},
            { path: 'favourites', component: FavouritesComponent, resolve: { users: FavouritesResolver}}
        ]
    },
    { path: 'available-shooters', component: AvailableShootersListComponent,
        resolve: {users: AvailableShooterListResolver}, canActivate: [AuthGuard]},
    { path: '**', redirectTo: 'home', pathMatch: 'full'},
    // This means that we want to match the full home path to the wild card **. ** means anything that doesn't match a previous path
    // Could put available-shooters in children array but this shows the 2 different methods to implement a guard
    // For larger applications the children array is the better choice
];
