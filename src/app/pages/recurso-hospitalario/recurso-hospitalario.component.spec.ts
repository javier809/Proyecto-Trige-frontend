import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursoHospitalarioComponent } from './recurso-hospitalario.component';

describe('RecursoHospitalarioComponent', () => {
  let component: RecursoHospitalarioComponent;
  let fixture: ComponentFixture<RecursoHospitalarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecursoHospitalarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecursoHospitalarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
