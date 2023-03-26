import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { GuiComponent } from './gui.component';

describe('GuiComponent', () => {
  let component: GuiComponent;
  let fixture: ComponentFixture<GuiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ GuiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
