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

  private getValue(i: number): number {
    return parseInt((document.getElementById(`value${i}`) as HTMLInputElement).value)
  }

  generateParityBits(): void {
    (document.getElementById('check-verdict') as HTMLElement).style.height = '0';

    // input data in input fields with ids value1, value3, value5...7, value9...15
    let parityBits = [];
    
    let getValue = this.getValue;
    
    // calculate parity bits
    parityBits[0] = (getValue(1) + getValue(3) + getValue(5) + getValue(7) + getValue(9) + getValue(11) + getValue(13) + getValue(15)) % 2;
    parityBits[1] = (getValue(2) + getValue(3) + getValue(6) + getValue(7) + getValue(10) + getValue(11) + getValue(14) + getValue(15)) % 2;
    parityBits[2] = (getValue(4) + getValue(5) + getValue(6) + getValue(7) + getValue(12) + getValue(13) + getValue(14) + getValue(15)) % 2;
    parityBits[3] = (getValue(8) + getValue(9) + getValue(10) + getValue(11) + getValue(12) + getValue(13) + getValue(14) + getValue(15)) % 2;

    // display parity bits
    for (let i = 0; i < 4; i++) {
      (document.getElementById(`value${2 ** i}`) as HTMLSpanElement).innerText = parityBits[i].toString();
    }

    // final parity check on the whole block
    let finalParity = (parityBits[0] + parityBits[1] + parityBits[2] + parityBits[3]) % 2;
    (document.getElementById('value0') as HTMLSpanElement).innerText = finalParity.toString();
  }

  checkData(): void {
    let getValue = this.getValue;
    let parityBits = [];
    parityBits[0] = (getValue(1) + getValue(3) + getValue(5) + getValue(7) + getValue(9) + getValue(11) + getValue(13) + getValue(15)) % 2;
    parityBits[1] = (getValue(2) + getValue(3) + getValue(6) + getValue(7) + getValue(10) + getValue(11) + getValue(14) + getValue(15)) % 2;
    parityBits[2] = (getValue(4) + getValue(5) + getValue(6) + getValue(7) + getValue(12) + getValue(13) + getValue(14) + getValue(15)) % 2;
    parityBits[3] = (getValue(8) + getValue(9) + getValue(10) + getValue(11) + getValue(12) + getValue(13) + getValue(14) + getValue(15)) % 2;

    let finalParity = (parityBits[0] + parityBits[1] + parityBits[2] + parityBits[3]) % 2;
    let parityError = false;
    if (finalParity != getValue(0)) {
      parityError = true;
    }

    let errorBits = [];
    for (let i = 0; i < 4; i++) {
      if (parityBits[i] != getValue(2 ** i)) {
        errorBits.push(2 ** i);
      }
    }

    let errorBit = 0;
    if (errorBits.length > 0) {
      errorBit = errorBits.reduce((acc, val) => acc + val);
    }

    let verdict = document.getElementById('check-verdict') as HTMLElement;
    if (parityError) {
      verdict.style.height = 'auto';
      verdict.innerText = `Parity error detected. Error in bit ${errorBit}.`;
    } else if (errorBits.length > 0) {
      verdict.style.height = 'auto';
      verdict.innerText = `Data error detected. Error in bit ${errorBit}.`;
    } else {
      verdict.style.height = 'auto';
      verdict.innerText = 'No errors detected.';
    }
  }

  reset(): void { (document.getElementById('check-verdict') as HTMLElement).style.height = '0'; document.querySelectorAll('input').forEach((input) => { input.value = "" }); }
}
