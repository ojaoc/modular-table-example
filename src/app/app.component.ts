import { Component } from '@angular/core'
import { dataset } from './core/mocks/dataset'
import { Data } from './core/models/data'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'my-app'
  tableData: Data

  constructor() {
    this.tableData = dataset
  }
}
