import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth';  // ← Изменить Auth на AuthService

describe('AuthService', () => {  // ← Изменить Auth на AuthService
  let service: AuthService;      // ← Изменить Auth на AuthService

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);  // ← Изменить Auth на AuthService
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});