import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [BrowserModule]
})
export class AppComponent {
  title = 'connections-app';
}
