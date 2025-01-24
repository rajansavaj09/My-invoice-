import { Component, OnInit } from '@angular/core';
import { InvoiceFormService } from '../../services/invoice-form.service';
import { invoiceInterface } from '../../interface/invoice-interface';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-history',
  // standalone: true,
  // imports: [],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent implements OnInit {
  constructor(
    private invoiceService: InvoiceFormService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  getInvoiceDetail: invoiceInterface | any;
  ngOnInit(): void {
    this.getInvoice();
    this.authService.checkLoginStatus();

    
  }

  getInvoice() {
    this.invoiceService.getInvoice().subscribe((data) => {
      this.getInvoiceDetail = data;
      return this.getInvoiceDetail;
    });
  }

  deleteInvoice(id: number) {
    debugger;
    this.invoiceService.deleteInvoice(id).subscribe((result) => {
      this.getInvoice();
    });
  }
  exportexcel() {
    const flattenedData = this.getInvoiceDetail.flatMap((detail: any) =>
      detail.items.map((item: any, index: number) => ({
        customer: detail.WhoIsThisToValue,
        type: detail.type,
        number: detail.invoiceNo,
        date: detail.DateValue,
        due_date: detail.dueDateValue,
        currency: detail.currency || '',
        total: detail.valueTotal,
        item: item.description,
        description: item.description || '',
        quantity: item.quantity || 0,
        unit_cost: item.rate || 0,
        discount: detail.valueDiscount || 0,
        tax: detail.valueTax || 0,
        shipping: detail.valueShipping || 0,
      }))
    );

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(flattenedData);
    const workbook: XLSX.WorkBook = {
      Sheets: { Invoices: worksheet },
      SheetNames: ['Invoices'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const data: Blob = new Blob([excelBuffer], {
      type: 'application/octet-stream',
    });
    FileSaver.saveAs(data, 'Invoices.xlsx');
  }


}
