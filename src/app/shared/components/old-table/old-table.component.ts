import { CdkDragSortEvent, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Data } from 'src/app/core/models/data';

@Component({
  selector: 'app-old-table',
  templateUrl: './old-table.component.html',
  styleUrls: ['./old-table.component.scss'],
})
export class OldTableComponent implements OnInit {
  @Input() dataSet: Data;

  constructor() {
    this.dataSet = { columns: [], data: [] };
  }

  ngOnInit(): void {}

  sort(event: CdkDragSortEvent<{ name: string; title: string }[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
}
