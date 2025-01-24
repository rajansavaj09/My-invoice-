import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicingGuideComponent } from './invoicing-guide.component';

describe('InvoicingGuideComponent', () => {
  let component: InvoicingGuideComponent;
  let fixture: ComponentFixture<InvoicingGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoicingGuideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicingGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
