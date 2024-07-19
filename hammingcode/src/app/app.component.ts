import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor() {
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('input').forEach((input) => {
        let prevVal = "";
        input.addEventListener('input', function (e) {
          if (this.checkValidity()) {
            prevVal = this.value;
          } else {
            this.value = prevVal;
          }
        })
      });
    }
    );
  }
}
