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
  private getValue(i: number): number {
    let r = (Number.isNaN(parseInt((document.getElementById(`value${i}`) as HTMLInputElement).value))) ? 0 : parseInt((document.getElementById(`value${i}`) as HTMLInputElement).value);
    return r
  }

  private resetParityBits(): void {
    for (let i = 0; i < 4; i++) {
      (document.getElementById(`value${2**i}`) as HTMLInputElement).value = "0";
    }
  }

  generateParityBits(): void {
    console.log('generateParityBits');
    (document.getElementById('check-verdict') as HTMLElement).style.display = 'none';

    // input data in input fields with ids value1, value3, value5...7, value9...15
    let parityBits = [];

    let getValue = this.getValue;

    // calculate parity bits
    // first parity: of bits 1, 3, 5, 7, 9, 11, 13, 15 (2nd and 4th columns)
    // second parity: of bits 2, 3, 6, 7, 10, 11, 14, 15 (3rd and 4th columns)
    // third parity: of bits 4, 5, 6, 7, 12, 13, 14, 15 (2nd and 4th rows)
    // fourth parity: of bits 8, 9, 10, 11, 12, 13, 14, 15 (3rd and 4th rows)

    this.resetParityBits();

    parityBits[0] = (getValue(1) + getValue(3) + getValue(5) + getValue(7) + getValue(9) + getValue(11) + getValue(13) + getValue(15)) % 2;
    parityBits[1] = (getValue(2) + getValue(3) + getValue(6) + getValue(7) + getValue(10) + getValue(11) + getValue(14) + getValue(15)) % 2;
    parityBits[2] = (getValue(4) + getValue(5) + getValue(6) + getValue(7) + getValue(12) + getValue(13) + getValue(14) + getValue(15)) % 2;
    parityBits[3] = (getValue(8) + getValue(9) + getValue(10) + getValue(11) + getValue(12) + getValue(13) + getValue(14) + getValue(15)) % 2;
    // display parity bits
    for (let i = 0; i < 4; i++) {
      if (parityBits[i] != 0) {
        (document.getElementById(`value${2 ** i}`) as HTMLInputElement).value = parityBits[i].toString();
      }
    }

    // final parity check on the whole block
    let total = 0;
    for (let i = 0; i < 16; i++) {
      total += getValue(i);
    }
    let finalParity = (total) % 2;

    if (finalParity != 0) {
      (document.getElementById('value0') as HTMLInputElement).value = finalParity.toString();
    }

    (document.getElementById('result') as HTMLSpanElement).style.display = 'block';
    (document.getElementById('result') as HTMLSpanElement).innerText = `${getValue(0)}`
    for (let i = 1; i < 16; i++) {
      (document.getElementById('result') as HTMLSpanElement).innerText = `${(document.getElementById('result') as HTMLSpanElement).innerText}${getValue(i)}`
    }
  }

  checkData(): void {
    let getValue = this.getValue;
    let currentParityBits = [];
    let error = false;
    let errorBit = 0;
    let finalParity = 0;
    // calculate current parity bits

    // first parity: of bits 1, 3, 5, 7, 9, 11, 13, 15 (2nd and 4th columns)
    // second parity: of bits 2, 3, 6, 7, 10, 11, 14, 15 (3rd and 4th columns)
    // third parity: of bits 4, 5, 6, 7, 12, 13, 14, 15 (2nd and 4th rows)
    // fourth parity: of bits 8, 9, 10, 11, 12, 13, 14, 15 (3rd and 4th rows)

    currentParityBits[0] = (getValue(1) + getValue(3) + getValue(5) + getValue(7) + getValue(9) + getValue(11) + getValue(13) + getValue(15)) % 2;
    currentParityBits[1] = (getValue(2) + getValue(3) + getValue(6) + getValue(7) + getValue(10) + getValue(11) + getValue(14) + getValue(15)) % 2;
    currentParityBits[2] = (getValue(4) + getValue(5) + getValue(6) + getValue(7) + getValue(12) + getValue(13) + getValue(14) + getValue(15)) % 2;
    currentParityBits[3] = (getValue(8) + getValue(9) + getValue(10) + getValue(11) + getValue(12) + getValue(13) + getValue(14) + getValue(15)) % 2;
    finalParity = (getValue(0) + getValue(1) + getValue(2) + getValue(3) + getValue(4) + getValue(5) + getValue(6) + getValue(7) + getValue(8) + getValue(9) + getValue(10) + getValue(11) + getValue(12) + getValue(13) + getValue(14) + getValue(15)) % 2;
    let errorInParities = [];

    if (finalParity != 0) {
      error = true;
      errorInParities.push(0);
    }
    else {
      errorInParities.push(1);
    }

    for (let i = 0; i < 4; i++) {
      if (currentParityBits[i] != 0) {
        error = true;
        errorInParities.push(1)
      }
      else {
        errorInParities.push(0)
      }
    }

    // assuming only 1 error, find the error bit by comparing the original parity bits with the current parity bits
    function binaryToDecimal(binary: number[]): number {
      let decimal = 0;
      let bR = binary.reverse();
      for (let i = 0; i < binary.length; i++) {
        decimal += bR[i] * 2 ** i;
      }
      return decimal;
    }
    if (error) {
      errorBit = binaryToDecimal(errorInParities);
      (document.getElementById('check-verdict') as HTMLSpanElement).style.display = 'block';
      if (errorBit < 16) {
        (document.getElementById('check-verdict') as HTMLSpanElement).innerText = `Error detected in bit ${errorBit}`;
        (document.getElementById(`value${errorBit}`)?.parentElement as HTMLElement).style.backgroundColor = '#893232';
      }
      else {
        (document.getElementById('check-verdict') as HTMLSpanElement).innerText = `Error detected in multiple bits`;
      }
    }
    else {
      (document.getElementById('check-verdict') as HTMLSpanElement).style.display = 'block';
      (document.getElementById('check-verdict') as HTMLSpanElement).innerText = 'No error detected';
    }
  }

  reset(): void {
    (document.getElementById('check-verdict') as HTMLSpanElement).style.display = 'none';
    document.querySelectorAll('input').forEach((input) => { input.value = "0" });
  }
  
  constructor() {
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('input').forEach((input) => {
        let prevVal = "";
        input.addEventListener('input', function (e) {
          if (this.checkValidity()) {
            if (this.value.length > 1 && this.value[0] === '0') {
              this.value = this.value.slice(1);
            }
            else if (this.value.length > 1 && this.value.endsWith('1')) {
              this.value = "1"
            }
            input.parentElement!.style.backgroundColor = '#696969';
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