import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpageComponent } from './enterpage.component';

describe('EnterpageComponent', () => {
  let component: EnterpageComponent;
  let fixture: ComponentFixture<EnterpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
