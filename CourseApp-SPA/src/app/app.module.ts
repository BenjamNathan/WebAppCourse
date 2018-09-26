import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';

@NgModule({
   declarations: [
      AppComponent,
      ValueComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule
      // HttpCLientModule will allow us to usehhtp get requests
      // This lives in the @angular/common package found in package.json therefore that needd to be imported above
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
