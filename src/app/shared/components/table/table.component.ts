import { CdkDragSortEvent, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Data } from 'src/app/core/models/data';
import { FilterTableComponent } from './filter-table-modal/filter-table-modal.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @ViewChild(FilterTableComponent) filterTableComponent!: FilterTableComponent;

  @Input() dataSet: Data;
  page: number;
  size: number;
  isVisible: boolean;
  checked: boolean;

  constructor() {
    this.dataSet = { columns: [], data: [] };
    this.page = 1;
    this.size = 10;
    this.isVisible = false;
    this.checked = true;
  }

  showModal(): void {
    this.filterTableComponent.bootstrapComponent();
    this.isVisible = true;
  }

  ngOnInit(): void {}

  reorderCol(
    event: CdkDragSortEvent<{ name: string; title: string; checked: boolean }[]>
  ) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  changePage(newPage: number) {
    this.page = newPage;
  }

  changeSize(newSize: number) {
    this.size = newSize;
  }
}
