import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorPanel } from './contractor-panel';

describe('ContractorPanel', () => {
  let component: ContractorPanel;
  let fixture: ComponentFixture<ContractorPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractorPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractorPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
