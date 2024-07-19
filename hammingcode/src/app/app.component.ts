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
            if (this.value.length > 1 && this.value[0] === '0') {
              this.value = this.value.slice(1);
            }
            else if (this.value.length > 1 && this.value.endsWith('1')) {
              this.value = "1"
            }
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
    let r = (Number.isNaN(parseInt((document.getElementById(`value${i}`) as HTMLInputElement).value))) ? 0 : parseInt((document.getElementById(`value${i}`) as HTMLInputElement).value);
    return r
  }

  generateParityBits(): void {
    (document.getElementById('check-verdict') as HTMLElement).style.height = '0';

    // input data in input fields with ids value1, value3, value5...7, value9...15
    let parityBits = [];

    let getValue = this.getValue;

    // calculate parity bits
    // first parity: of bits 1, 3, 5, 7, 9, 11, 13, 15 (2nd and 4th columns)
    // second parity: of bits 2, 3, 6, 7, 10, 11, 14, 15 (3rd and 4th columns)
    // third parity: of bits 4, 5, 6, 7, 12, 13, 14, 15 (2nd and 4th rows)
    // fourth parity: of bits 8, 9, 10, 11, 12, 13, 14, 15 (3rd and 4th rows)

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
    let finalParity = (parityBits[0] + parityBits[1] + parityBits[2] + parityBits[3]) % 2;
    (document.getElementById('value0') as HTMLInputElement).innerText = finalParity.toString();

    (document.getElementById('result') as HTMLSpanElement).style.height = 'auto';
    (document.getElementById('result') as HTMLSpanElement).innerText = `${getValue(0)}`
    for (let i = 1; i < 16; i++) {
      (document.getElementById('result') as HTMLSpanElement).innerText = `${(document.getElementById('result') as HTMLSpanElement).innerText}${getValue(i)}`
    }
  }

  checkData(): void {
    let getValue = this.getValue;
    let originalParityBits = [getValue(0), getValue(1), getValue(2), getValue(4), getValue(8)];
    let currentParityBits = [];
    let error = false;

    // calculate current parity bits

    // first parity: of bits 1, 3, 5, 7, 9, 11, 13, 15 (2nd and 4th columns)
    // second parity: of bits 2, 3, 6, 7, 10, 11, 14, 15 (3rd and 4th columns)
    // third parity: of bits 4, 5, 6, 7, 12, 13, 14, 15 (2nd and 4th rows)
    // fourth parity: of bits 8, 9, 10, 11, 12, 13, 14, 15 (3rd and 4th rows)

    currentParityBits[0] = (getValue(1) + getValue(3) + getValue(5) + getValue(7) + getValue(9) + getValue(11) + getValue(13) + getValue(15)) % 2;
    currentParityBits[1] = (getValue(2) + getValue(3) + getValue(6) + getValue(7) + getValue(10) + getValue(11) + getValue(14) + getValue(15)) % 2;
    currentParityBits[2] = (getValue(4) + getValue(5) + getValue(6) + getValue(7) + getValue(12) + getValue(13) + getValue(14) + getValue(15)) % 2;
    currentParityBits[3] = (getValue(8) + getValue(9) + getValue(10) + getValue(11) + getValue(12) + getValue(13) + getValue(14) + getValue(15)) % 2;

    let possibleErrorBits = new Array<Array<number>>();

    for (let i = 0; i < 4; i++) {
      if (currentParityBits[i] != originalParityBits[i]) {
        error = true;
        if (currentParityBits.indexOf(i) == 0) {
          possibleErrorBits.push([1, 3, 5, 7, 9, 11, 13, 15]);
        }
        if (currentParityBits.indexOf(i) == 1) {
          possibleErrorBits.push([2, 3, 6, 7, 10, 11, 14, 15]);
        }
        if (currentParityBits.indexOf(i) == 2) {
          possibleErrorBits.push([4, 5, 6, 7, 12, 13, 14, 15]);
        }
        if (currentParityBits.indexOf(i) == 3) {
          possibleErrorBits.push([8, 9, 10, 11, 12, 13, 14, 15]);
        }
      }
    }

    // assuming only 1 error, find the error bit by comparing the original parity bits with the current parity bits

    if (error) {
      currentParityBits.forEach(i => {
        if (i != originalParityBits[currentParityBits.indexOf(i)]) {
          let errorBit = 0;
          console.log(possibleErrorBits);
          possibleErrorBits.forEach((arr) => {
            let commonBits = arr.filter(value => originalParityBits.includes(value));
            console.log(commonBits);
            if (commonBits.length == arr.length - 1) {
              errorBit = arr.filter(value => !commonBits.includes(value))[0];
            }
          });

          (document.getElementById('check-verdict') as HTMLElement).style.height = 'auto';
          (document.getElementById('check-verdict') as HTMLElement).innerText = `Error detected in bit ${errorBit}`;
        }
      });
    }
    else {
      (document.getElementById('check-verdict') as HTMLElement).style.height = 'auto';
      (document.getElementById('check-verdict') as HTMLElement).innerText = 'No error detected';
    }
  }

  reset(): void { (document.getElementById('check-verdict') as HTMLElement).style.height = '0'; document.querySelectorAll('input').forEach((input) => { input.value = "" }); }
}
