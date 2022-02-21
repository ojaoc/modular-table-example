import { CdkDragSortEvent, moveItemInArray } from '@angular/cdk/drag-drop'
import { Component, OnInit } from '@angular/core'
import { dataset } from 'src/app/core/mocks/dataset'
import { Data } from 'src/app/core/models/data'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  dataSet: Data
  page: number
  size: number
  isVisible: boolean
  checked: boolean

  constructor() {
    this.dataSet = dataset
    this.page = 1
    this.size = 10
    this.isVisible = false
    this.checked = true
  }

  showModal(): void {
    this.isVisible = true
  }

  ngOnInit(): void {}

  reorderCol(event: CdkDragSortEvent<{ name: string; title: string }[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    )
  }

  changePage(newPage: number) {
    this.page = newPage
  }

  changeSize(newSize: number) {
    this.size = newSize
  }
}
