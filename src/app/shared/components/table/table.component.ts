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
  isVisible: boolean;
  checked: boolean;

  constructor() {
    this.dataSet = dataset
    this.isVisible = false;
    this.checked = true;
  }

  showModal(): void {
    this.isVisible = true
  }

  ngOnInit(): void {}

  sort(event: CdkDragSortEvent<{ name: string; title: string }[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    )
  }
}
