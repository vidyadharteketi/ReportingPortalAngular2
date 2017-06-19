import { Injectable } from '@angular/core';

declare let ExcellentExport: any;

@Injectable()
export class ExportToExcelService {

        excel(anchor: any, table: any, sheetName: string, excelName: string = 'export'): any {
                ExcellentExport.excel(anchor, table, sheetName, excelName);
        }
        excelByTableElement(anchor: any, table: any, sheetName: string, excelName: string = 'export'): any {
                var link = ExcellentExport.excelByTableElement(anchor, table, sheetName, excelName);
        }

        csvByTableElement(anchor: any, table: any, sheetName: string, excelName: string = 'export'): any {
                var link = ExcellentExport.csvByTableElement(anchor, table, sheetName, excelName);
        }
}