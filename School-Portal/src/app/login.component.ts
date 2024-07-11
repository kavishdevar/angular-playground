import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-login',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [RouterOutlet, MatButtonModule, MatInputModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
})
export class LoginComponent {
    loginForm = new FormGroup({
        rollNumber: new FormControl(''),
        password: new FormControl(''),
    });
    onSubmit() {
        interface LoginResponse {
            deviceId: string;
            userId: string;
            name: string;
            isVerified: boolean;
            accessToken: string;
            accessTokenValidityDurationSeconds: number;
            refreshToken: string;
            organizationId: string;
            refundpolicyUrl: string;
            showRefundPolicy: boolean;
        }
                
        fetch("https://api-v2-6-0.eapp.vidyamandir.com/mysa/connectorg/organizations/1/login", {
            "body": `{\"loginValue\":\"${this.loginForm.value.rollNumber}\",\"passwordValue\":\"${this.loginForm.value.password}\",\"deviceId\":\"testing\",\"identityType\":\"ROLLNUMBER\"}`,
            "method": "POST"
        }).then(r => r.json().then(
            json => {
                json = json as LoginResponse;
                localStorage.setItem('name', json.name);
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('accessToken', json.accessToken);
                localStorage.setItem('organizationID', json.organizationId);
            }
        ));
    }
}