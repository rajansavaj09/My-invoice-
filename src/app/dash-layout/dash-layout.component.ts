import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvoiceFormService } from '../services/invoice-form.service';
import { jsPDF } from 'jspdf';
import { ActivatedRoute } from '@angular/router';
import { invoiceInterface } from '../interface/invoice-interface';

@Component({
  selector: 'app-dash-layout',
  templateUrl: './dash-layout.component.html',
  styleUrls: ['./dash-layout.component.scss'],
})
export class DashLayoutComponent {
  previewImage: string | null = null;
  allInvoice: invoiceInterface = {}
  invoiceForm: FormGroup;
  subtotal = 0;
  total = 0;
  balanceDue = 0;
  amountPaid = 0;
  invoiceId: number = 0;
  isLoggedIn =  false;
  showPDF = false
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private invoiceFormService: InvoiceFormService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.invoiceForm = this.fb.group({
      imagePath: ['', Validators.required],
      type: ['INVOICE', Validators.required],
      invoiceNo: [0, Validators.required],
      formName: ['', Validators.required],
      labelBillToMe: ['Bill To', Validators.required],
      WhoIsThisToValue: ['', Validators.required],
      labelShipTo: ['Ship To', Validators.required],
      optionalValue: ['', Validators.required],
      date: ['Date', Validators.required],
      DateValue: ['', Validators.required],
      paymentTerms: ['Payment Terms', Validators.required],
      paymentTermsValue: ['', Validators.required],
      dueDate: ['Due Date', Validators.required],
      dueDateValue: ['', Validators.required],
      poNumber: ['PO Number', Validators.required],
      poNumberValue: ['', Validators.required],
      labelItemName: ['Item', Validators.required],
      labelQuantity: ['Quantity', Validators.required],
      labelCost: ['Rate', Validators.required],
      labelAmount: ['Amount', Validators.required],
      items: this.fb.array([this.createItem()]),
      labelNotes: ['Notes', Validators.required],
      valueNotes: ['', Validators.required],
      labelTerms: ['Terms', Validators.required],
      valueTerms: ['', Validators.required],
      labelSubtotal: ['Subtotal', Validators.required],
      valueSubtotal: [0, Validators.required],
      labelDiscount: ['Discount', Validators.required],
      valueDiscount: [0, Validators.required],
      labelTax: ['Tax', Validators.required],
      valueTax: [0, Validators.required],
      labelShipping: ['Shipping', Validators.required],
      valueShipping: [0, Validators.required],
      labelTotal: ['Total', Validators.required],
      valueTotal: [0, Validators.required],
      labelAmountPaid: ['Amount Paid', Validators.required],
      valueAmountPaid: [0, Validators.required],
      labelBalanceDue: ['Balance Due', Validators.required],
      valueBalanceDue: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.invoiceId = Number(param.get('id'));
      if (this.invoiceId) {
        this.getById(this.invoiceId);
      }
    });
    this.authService.checkLoginStatus();
    this.authService.isLoggedIn.subscribe((status) => (this.isLoggedIn = status));
    // this.route.paramMap.subscribe((param) => {
    //   const idParam = param.get('id');
    //   console.log('Route Parameter (id):', idParam); // Debugging
    //   this.invoiceId = Number(idParam); // Converts to number
    //   if (!isNaN(this.invoiceId) && this.invoiceId > 0) {
    //     this.getById(this.invoiceId);
    //   } else {
    //     console.error('Invalid or missing invoice ID:', idParam);
    //   }
    // });
  }

  get formData() {
    return this.invoiceForm.value;
  }

  getFieldValue(fieldName: string) {
    return this.invoiceForm.get(fieldName)?.value;
  }

  setFormData(data: any) {
    this.invoiceForm.patchValue(data);
  }

  downloadPDF() {
    debugger
    this.cdr.detectChanges();
    const pdf = new jsPDF('p', 'pt', 'a4');
    const invoice = document.getElementById('invoices');

    if (invoice) {
      const base64Image = this.invoiceForm.value.imagePath;
      if (base64Image) {
        pdf.addImage(base64Image, 'PNG', 20, 20, 100, 50);
      }

      pdf.html(invoice, {
        callback: (doc) => {
          doc.save('invoice.pdf');
          this.showPDF = false;
        },
        x: 0,
        y: 0,
        html2canvas: {
          scale: 0.75,
          useCORS: true,
          logging: true,
        },
      });
    }
    this.showPDF = false;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const base64Image = e.target?.result as string;
        this.previewImage = base64Image;
        this.invoiceForm.patchValue({ imagePath: base64Image });
      };
      reader.readAsDataURL(file);
    }
  }

  get items() {
    return this.invoiceForm.get('items') as FormArray;
  }

  onSubmit() {
    this.showPDF = true;
    if (this.invoiceId > 0) {
      debugger
      const newData = {
        id: this.invoiceId,
        ...this.invoiceForm.value,
        isLoggedIn: this.isLoggedIn
      }
      
      this.invoiceFormService.updateInvoice(newData).subscribe({
        next: () => {
          alert('Update Invoice Successfully');
        },
        error: (er) => {
          console.error(er)
        }
       
      })
    }else{
      console.log(this.invoiceForm.value);
       alert('Invoice Submitted');
       const newData = {
        isLoggedIn: this.isLoggedIn,
        ...this.invoiceForm.value
      }
       this.invoiceFormService.createInvoice(newData).subscribe(() => {
        this.downloadPDF()
        console.log(newData,'Invoice created successfully');
    });
    }
   

  }

  createItem(): FormGroup {
    return this.fb.group({
      description: ['', Validators.required],
      quantity: [0, Validators.required],
      rate: [0, Validators.required],
      amount: [0, Validators.required],
    });
  }

  addItem() {
    this.items.push(this.createItem());
    this.calculateTotals();
  }

  removeItem(index: number) {
    this.items.removeAt(index);
    this.calculateTotals();
  }

  calculateItemAmount(quantity: number, rate: number): number {
    return quantity * rate;
  }

  calculateTotals() {
    const items = this.invoiceForm.value.items;
    this.subtotal = items.reduce(
      (acc: number, item: { quantity: number; rate: number }) =>
        acc + item.quantity * item.rate,
      0
    );

    const discount = (this.subtotal * this.invoiceForm.value.valueDiscount) / 100;
    const tax = ((this.subtotal - discount) * this.invoiceForm.value.valueTax) / 100;

    this.total = this.subtotal - discount + tax + this.invoiceForm.value.valueShipping;
    this.balanceDue = this.total - this.invoiceForm.value.valueAmountPaid;

    this.invoiceForm.patchValue({
      valueSubtotal: this.subtotal.toFixed(2),
      valueTotal: this.total.toFixed(2),
      valueBalanceDue: this.balanceDue.toFixed(2),
    });
  }

  getById(id: any) {
    this.invoiceFormService.getById(id).subscribe((data: invoiceInterface) => {
      debugger
      console.log('Fetched Data:', data);
      this.allInvoice = data;
  
      this.invoiceForm.patchValue({
        imagePath: data.imagePath ,
        type: data.type ,
        invoiceNo: data.invoiceNo,
        formName: data.formName ,
        labelBillToMe: data.labelBillToMe ,
        WhoIsThisToValue: data.WhoIsThisToValue,
        labelShipTo: data.labelShipTo,
        optionalValue: data.optionalValue,
        date: data.date,
        DateValue: data.DateValue,
        paymentTerms: data.paymentTerms,
        paymentTermsValue: data.paymentTermsValue,
        dueDate: data.dueDate,
        dueDateValue: data.dueDateValue,
        poNumber: data.poNumber,
        poNumberValue: data.poNumberValue,
        labelNotes: data.labelNotes,
        valueNotes: data.valueNotes,
        labelTerms: data.labelTerms,
        valueTerms: data.valueTerms,
        labelSubtotal: data.labelSubtotal,
        valueSubtotal: data.valueSubtotal,
        labelDiscount: data.labelDiscount,
        valueDiscount: data.valueDiscount,
        labelTax: data.labelTax,
        valueTax: data.valueTax,
        labelShipping: data.labelShipping,
        valueShipping: data.valueShipping ,
        labelTotal: data.labelTotal,
        valueTotal: data.valueTotal,
        labelAmountPaid: data.labelAmountPaid,
        valueAmountPaid: data.valueAmountPaid,
        labelBalanceDue: data.labelBalanceDue,
        valueBalanceDue: data.valueBalanceDue ,
      });
  
      // Handle dynamic items array
      this.items.clear();
      if (data.items && data.items.length) {
        data.items.forEach((item) => {
          this.items.push(
            this.fb.group({
              description: item.description,
              quantity: item.quantity,
              rate: item.rate,
              amount: item.amount,
            })
          );
        });
      }
      this.calculateTotals();
    });

    
  }
  
}
