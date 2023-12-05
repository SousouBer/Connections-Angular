import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SigninComponent } from './auth/components/signin/signin.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { MainComponent } from './core/components/main/main.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ProfileComponent } from './core/components/profile/profile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    MainComponent,
    FooterComponent,
    ProfileComponent,
    RouterModule,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'connections-app';
}
