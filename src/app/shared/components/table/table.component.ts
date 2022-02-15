import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, OnInit } from "@angular/core";
import { dataset } from "src/app/core/mocks/dataset";
import { Data } from "src/app/core/models/data";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
})
export class TableComponent implements OnInit {
  dataSet: Data;

  constructor() {
    this.dataSet = dataset;
  }

  ngOnInit(): void {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    moveItemInArray(
      this.dataSet.props,
      event.previousIndex,
      event.currentIndex
    );
  }
}
