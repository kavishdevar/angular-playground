import { Component, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginComponent } from './login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatIconModule, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'School Portal';
  isLoggedin = localStorage.getItem('isLoggedin');
  name = localStorage.getItem('name');
  loginForm = new FormGroup({
    rollNumber: new FormControl(''),
    password: new FormControl('')
  })
  onsSubmit() {
    fetch("https://api-v2-6-0.eapp.vidyamandir.com/mysa/connectorg/organizations/1/login", {
    "body": `{"loginValue": ${this.loginForm.value.rollNumber}, "password": ${this.loginForm.value.password}, "identityType": "ROLLNUMBER"}`,
    "method": "POST"
    }).then(respone =>
      respone.json().then( json =>
        {
          if (json["name"]!="") {
          }
        }
    ));
  }
}