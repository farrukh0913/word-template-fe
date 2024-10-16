import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTemplateNameModalComponent } from './add-template-name-modal.component';

describe('AddTemplateNameModalComponent', () => {
  let component: AddTemplateNameModalComponent;
  let fixture: ComponentFixture<AddTemplateNameModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTemplateNameModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTemplateNameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
