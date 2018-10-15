import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { TimeAgoPipe } from 'time-ago-pipe';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';
import { MessagesComponent } from './messages/messages.component';
import { appRoutes } from './routes';
import { AvailableShootersListComponent } from './available-shooters/available-shooters-list/available-shooters-list.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './_services/user.service';
import { AvailableShooterCardComponent } from './available-shooters/available-shooter-card/available-shooter-card.component';
import { AvailableShooterDetailComponent } from './available-shooters/available-shooter-detail/available-shooter-detail.component';
import { AvailableShooterDetailResolver } from './_resolvers/available-shooter-detail.resolver';
import { AvailableShooterListResolver } from './_resolvers/available-shooter-list.resolver';
import { AvailableShooterEditComponent } from './available-shooters/available-shooter-edit/available-shooter-edit.component';
import { AvailableShooterEditResolver } from './_resolvers/available-shooter-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { PhotoEditorComponent } from './available-shooters/photo-editor/photo-editor.component';
import { FavouritesResolver } from './_resolvers/favourites.resolver';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { AvailableShooterMessagesComponent } from './available-shooters/available-shooter-messages/available-shooter-messages.component';

export function tokenGetter() {
    return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MessagesComponent,
      AvailableShootersListComponent,
      AvailableShooterCardComponent,
      AvailableShooterDetailComponent,
      FavouritesComponent,
      AvailableShooterEditComponent,
      PhotoEditorComponent,
      TimeAgoPipe,
      AvailableShooterMessagesComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      PaginationModule.forRoot(),
      TabsModule.forRoot(),
      ButtonsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      NgxGalleryModule,
      FileUploadModule,
      JwtModule.forRoot({
          config: {
              tokenGetter: tokenGetter,
              whitelistedDomains: ['localhost:5000'],
              blacklistedRoutes: ['localhost:5000/auth']
          }
      })
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard,
      UserService,
      AvailableShooterDetailResolver,
      AvailableShooterListResolver,
      AvailableShooterEditResolver,
      PreventUnsavedChanges,
      FavouritesResolver,
      MessagesResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
