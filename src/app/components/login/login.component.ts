import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  role: string = '';
  loginError: string = '';

  constructor(private router: Router) {}

  onLogin() {
    // Simple check: ensure email, password, and role are selected
    if (!this.email || !this.password || !this.role) {
      this.loginError = 'Please fill in all fields.';
      return;
    }

    // Clear error
    this.loginError = '';

    // Role-based redirection
    if (this.role === 'admin') {
      this.router.navigate(['/admin']);
    } else if (this.role === 'customer') {
      this.router.navigate(['']);
    } else {
      this.loginError = 'Invalid role selected.';
    }
  }
}
