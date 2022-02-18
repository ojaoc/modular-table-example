import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableWithDraggerComponent } from './table-with-dragger.component';

describe('TableWithDraggerComponent', () => {
  let component: TableWithDraggerComponent;
  let fixture: ComponentFixture<TableWithDraggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableWithDraggerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableWithDraggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
