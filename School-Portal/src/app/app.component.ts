import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatIconModule, LoginComponent, MatToolbarModule, MatSidenavModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'School Portal';
  isLoggedIn = localStorage.getItem('isLoggedIn')
  name = localStorage.getItem('name');
  accessToken = localStorage.getItem('accessToken');
  organizationID = localStorage.getItem('organizationID');
  logout() {
    localStorage.clear();
    document.location.href = '/login';
  }
}