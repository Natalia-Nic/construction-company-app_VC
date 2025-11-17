import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token'); // 🔥 ИЗМЕНИТЬ с auth_token на token
    if (token) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}