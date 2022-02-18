import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OldTableComponent } from './old-table.component';

describe('TableComponent', () => {
  let component: OldTableComponent;
  let fixture: ComponentFixture<OldTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OldTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OldTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
