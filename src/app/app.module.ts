import { DragDropModule } from '@angular/cdk/drag-drop'
import { registerLocaleData } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import en from '@angular/common/locales/en'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox'
import { NzGridModule } from 'ng-zorro-antd/grid'
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzListModule } from 'ng-zorro-antd/list'
import { NzModalModule } from 'ng-zorro-antd/modal'
import { NzPaginationModule } from 'ng-zorro-antd/pagination'
import { AppComponent } from './app.component'
import { FilterTableComponent } from './shared/components/table/filter-table-modal/filter-table-modal.component'
import { TableComponent } from './shared/components/table/table.component'
import { PaginationPipe } from './shared/pipes/pagination.pipe'

registerLocaleData(en)

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    FilterTableComponent,
    PaginationPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzListModule,
    DragDropModule,
    NzIconModule,
    NzGridModule,
    NzPaginationModule,
    NzModalModule,
    NzCheckboxModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
