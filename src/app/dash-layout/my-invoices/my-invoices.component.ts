import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { InvoiceFormService } from '../../services/invoice-form.service';
import { invoiceInterface } from '../../interface/invoice-interface';

@Component({
  selector: 'app-my-invoices',
  // standalone: true,
  // imports: [],
  templateUrl: './my-invoices.component.html',
  styleUrl: './my-invoices.component.scss'
})

export class MyInvoicesComponent {
  constructor(
    private authService:AuthService,
    private invoiceService: InvoiceFormService,){} 
    getInvoiceDetail: invoiceInterface | any;
    ngOnInit(): void {
      this.getInvoice();
      this.authService.checkLoginStatus();  
    }
  
    getInvoice() {
      this.invoiceService.getInvoice().subscribe((data) => {
        this.getInvoiceDetail = data.filter((data:any) => data.isLoggedIn === true);
        return this.getInvoiceDetail;
      });
    }
  
    deleteInvoice(id: number) {
      debugger;
      this.invoiceService.deleteInvoice(id).subscribe((result) => {
        this.getInvoice();
      });
    }
   
    paidInvoice(invoiceId: number) {
      const invoice = this.getInvoiceDetail.find((i:any) => i.id === invoiceId);
      if (invoice) {
        invoice.status = 'Paid';
      }
    }
  
}