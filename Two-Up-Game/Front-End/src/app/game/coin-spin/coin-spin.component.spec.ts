import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinSpinComponent } from './coin-spin.component';

describe('CoinSpinComponent', () => {
  let component: CoinSpinComponent;
  let fixture: ComponentFixture<CoinSpinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinSpinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoinSpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
