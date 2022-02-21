import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import { Data } from 'src/app/core/models/data'
@Component({
  selector: 'app-filter-table-modal',
  templateUrl: './filter-table-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterTableComponent implements OnInit {
  innerFilterData: Data

  @Input() filterData: Data
  @Input() isVisible: boolean

  @Output() isVisibleChange: EventEmitter<boolean> = new EventEmitter()
  @Output() filterDataChange: EventEmitter<Data> = new EventEmitter()

  constructor() {
    this.isVisible = false
    this.innerFilterData = { columns: [], data: [] }
    this.filterData = { columns: [], data: [] }
  }

  ngOnInit(): void {
    this.bootstrapComponent()
  }

  async handleConfirm(): Promise<void> {
    this.isVisible = false
    this.isVisibleChange.emit(this.isVisible)

    this.filterDataChange.emit(this.innerFilterData)

    await this.delay(350)

    this.bootstrapComponent()
  }

  async handleCancel(): Promise<void> {
    this.isVisible = false
    this.isVisibleChange.emit(this.isVisible)

    await this.delay(350)

    this.bootstrapComponent()
  }

  private bootstrapComponent() {
    this.innerFilterData = JSON.parse(JSON.stringify(this.filterData))
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
