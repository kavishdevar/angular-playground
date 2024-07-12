import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatIconModule, LoginComponent, MatToolbarModule, MatSidenavModule, MatMenuModule, MatListModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
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
  constructor(private router: Router) {
    !this.isLoggedIn ? this.router.navigate(['/login']) : null;
  }
  actions = ["Learn", "Tests", "Homework", "Classes", "Calendar"]
}