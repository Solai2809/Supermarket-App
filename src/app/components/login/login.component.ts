import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ Required for directives like *ngFor and *ngIf
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true, // ✅ Make it a standalone component
  imports: [CommonModule, FormsModule], // ✅ Import FormsModule for ngModel


})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    if (this.username === 'admin' && this.password === 'admin123') {
      this.router.navigate(['/items']);
    } else {
      alert('Invalid username or password');
    }
  }
}
