import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule, TabsModule } from 'ng2-bootstrap';

@NgModule({
  imports: [CommonModule,
    FormsModule,
    HttpModule,
    Ng2TableModule,
    PaginationModule.forRoot(),
    TabsModule.forRoot()
  ],
  declarations: [],
  providers: []
})
export class ErCoverageReportModule { }
