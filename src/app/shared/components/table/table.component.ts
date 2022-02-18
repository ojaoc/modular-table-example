import { CdkDragSortEvent, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Data } from 'src/app/core/models/data';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() dataSet: Data;

  page: number;
  size: number;

  constructor() {
    this.dataSet = { columns: [], data: [] };
    this.page = 1;
    this.size = 10;
  }

  ngOnInit(): void {}

  reorderCol(event: CdkDragSortEvent<{ name: string; title: string }[]>) {
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
