import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';

import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import {Ng2PageScrollModule} from 'ng2-page-scroll';
import { ChatComponent } from './chat/chat.component';
import { SearchBarModule } from './search-bar/search-bar.module';
import { AuthGuardIsLoggedInService } from './auth-guard-is-logged-in.service';
import { AuthGuardIsLoggedOutService } from './auth-guard-is-logged-out.service';
import { RecipeService } from './recipe.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
    SignUpComponent,
    LogInComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng2PageScrollModule,
    SearchBarModule
  ],
  providers: [
    UserService,
    RecipeService,
    AuthGuardIsLoggedInService,
    AuthGuardIsLoggedOutService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
