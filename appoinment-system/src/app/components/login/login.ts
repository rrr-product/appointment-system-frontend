import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  constructor(private router: Router) { }

  email: string = '';
  password: string = '';
  showPassword = false;

  onSubmit() {
    console.log(this.email, this.password);
    this.router.navigate(['/dashboard']);
  }
}
