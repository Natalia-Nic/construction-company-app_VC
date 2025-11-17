import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    
    // 🔥 ИСПРАВИТЬ: получаем роль из user объекта, а не из user_role
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    const userRole = user?.role || 'Client';
    
    if (userRole === expectedRole || userRole === 'Admin') {
      return true;
    } else {
      alert('Недостаточно прав для доступа к этой странице');
      return false;
    }
  }
}