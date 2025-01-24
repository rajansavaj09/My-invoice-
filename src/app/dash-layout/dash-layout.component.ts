import { Component } from '@angular/core';
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
  // pdfShow: false;
  invoiceForm: FormGroup;
  subtotal = 0;
  total = 0;
  balanceDue = 0;
  amountPaid = 0;
  invoiceId: number = 0;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private invoiceFormService: InvoiceFormService,
    private route: ActivatedRoute,
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
    // this.authService.checkLoginStatus();

    this.route.paramMap.subscribe((param) => {
      debugger
      this.invoiceId = Number(param.get('id'));
      if (this.invoiceId) {
        this.getById(this.invoiceId);
      }
    });
    // this.route.paramMap.subscribe((param) => {
    //   const idParam = param.get('id');
    //   debugger
    //   if (idParam) {
    //     const id = Number(idParam);
    //     if (!isNaN(id)) {
    //       this.invoiceId = id;
    //       this.getById(this.invoiceId);
    //     } else {
    //       console.error('Invalid invoice ID:', idParam);
    //     }
    //   } else {
    //     console.error('No invoice ID found in the route');
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
    console.log(this.invoiceForm.value);
    alert('Invoice Submitted');
    this.invoiceFormService.createInvoice(this.invoiceForm.value).subscribe(() => {
      console.log('Invoice created successfully');
    });
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


  // getById(id:any){
  //   this.invoiceFormService.getById(id).subscribe((data)=>{
  //     this.allInvoice = data;
  //     console.log(this.allInvoice,'data')
  //     this.invoiceForm = this.fb.group({
       
  //       imagePath: [data,['imagePath']],
  //       type: [data,['type']],
  //       invoiceNo: [],
  //       formName: [],
  //       labelBillToMe: [],
  //       WhoIsThisToValue: [],
  //       labelShipTo: [],
  //       optionalValue: [],
  //       date: [],
  //       DateValue: [],
  //       paymentTerms: [],
  //       paymentTermsValue: [],
  //       dueDate: [],
  //       dueDateValue: [],
  //       poNumber: [],
  //       poNumberValue: [],
  //       labelItemName: [],
  //       labelQuantity: [],
  //       labelCost: [],
  //       labelAmount: [],
  //       items: this.fb.array([this.createItem()]),
  //       labelNotes: [],
  //       valueNotes: [],
  //       labelTerms: [],
  //       valueTerms: [],
  //       labelSubtotal: [],
  //       valueSubtotal: [],
  //       labelDiscount: [],
  //       valueDiscount: [],
  //       labelTax: [],
  //       valueTax: [],
  //       labelShipping: [],
  //       valueShipping: [],
  //       labelTotal: [],
  //       valueTotal: [],
  //       labelAmountPaid: [],
  //       valueAmountPaid: [],
  //       labelBalanceDue: [],
  //       valueBalanceDue: [],
  //     });
  //   })
  // }
  getById(id: any) {
    this.invoiceFormService.getById(id).subscribe((data: invoiceInterface) => {
      console.log('Fetched Data:', data);
      this.allInvoice = data;
  
      this.invoiceForm.patchValue({
        imagePath: data.imagePath ,
        type: data.type ,
        invoiceNo: data.invoiceNo,
        formName: data.formName ,
        labelBillToMe: data.labelBillToMe ,
        WhoIsThisToValue: data.WhoIsThisToValue || '',
        labelShipTo: data.labelShipTo || 'Ship To',
        optionalValue: data.optionalValue || '',
        date: data.date || 'Date',
        DateValue: data.DateValue || '',
        paymentTerms: data.paymentTerms || 'Payment Terms',
        paymentTermsValue: data.paymentTermsValue || '',
        dueDate: data.dueDate || 'Due Date',
        dueDateValue: data.dueDateValue || '',
        poNumber: data.poNumber || 'PO Number',
        poNumberValue: data.poNumberValue || '',
        labelNotes: data.labelNotes || 'Notes',
        valueNotes: data.valueNotes || '',
        labelTerms: data.labelTerms || 'Terms',
        valueTerms: data.valueTerms || '',
        labelSubtotal: data.labelSubtotal || 'Subtotal',
        valueSubtotal: data.valueSubtotal || 0,
        labelDiscount: data.labelDiscount || 'Discount',
        valueDiscount: data.valueDiscount || 0,
        labelTax: data.labelTax || 'Tax',
        valueTax: data.valueTax || 0,
        labelShipping: data.labelShipping || 'Shipping',
        valueShipping: data.valueShipping || 0,
        labelTotal: data.labelTotal || 'Total',
        valueTotal: data.valueTotal || 0,
        labelAmountPaid: data.labelAmountPaid || 'Amount Paid',
        valueAmountPaid: data.valueAmountPaid || 0,
        labelBalanceDue: data.labelBalanceDue || 'Balance Due',
        valueBalanceDue: data.valueBalanceDue || 0,
      });
  
      // Handle dynamic items array
      this.items.clear();
      if (data.items && data.items.length) {
        data.items.forEach((item) => {
          this.items.push(
            this.fb.group({
              description: item.description || '',
              quantity: item.quantity || 0,
              rate: item.rate || 0,
              amount: item.amount || 0,
            })
          );
        });
      }
  
      this.calculateTotals();
    });
  }
  
}
