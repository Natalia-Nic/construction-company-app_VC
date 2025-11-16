import { TestBed } from '@angular/core/testing';
import { UserService } from './user'; // Импортируем UserService, а не User

describe('UserService', () => { // Измени описание
  let service: UserService; // Измени тип

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService); // Измени инжект
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
