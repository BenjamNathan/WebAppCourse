import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';

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
      PhotoEditorComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
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
      PreventUnsavedChanges
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
