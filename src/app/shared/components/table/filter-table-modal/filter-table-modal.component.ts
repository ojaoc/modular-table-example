import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { Data } from 'src/app/core/models/data';
@Component({
  selector: 'app-filter-table-modal',
  templateUrl: './filter-table-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterTableComponent {
  @Input() filterData!: Data

  @Input() isVisible: boolean;

  @Output() isVisibleChange: EventEmitter<boolean> = new EventEmitter();

  constructor() {
    this.isVisible = false;
  }

  handleConfirm(): void {
    this.isVisible = false
    this.isVisibleChange.emit(this.isVisible)
  }

  handleCancel(): void {
    this.isVisible = false
    this.isVisibleChange.emit(this.isVisible)
  }
}
