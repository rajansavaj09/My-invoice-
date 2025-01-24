import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-settings',
  // standalone: true,
  // imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  invoiceForm: FormGroup;
  subtotal = 0;
  total = 0;
  balanceDue = 0;

  constructor(private fb: FormBuilder) {
    this.invoiceForm = this.fb.group({
      items: this.fb.array([
        this.createItem(),
      ]),
      notes: '',
      terms: '',
      discount: 0,
      tax: 0,
      amountPaid: 0,
    });
  }

  // Getter for items FormArray
  get items() {
    return this.invoiceForm.get('items') as FormArray;
  }

  // Create a single item FormGroup
  createItem(): FormGroup {
    return this.fb.group({
      description: '',
      quantity: 1,
      rate: 0,
    });
  }

  // Add a new item
  addItem() {
    this.items.push(this.createItem());
    this.calculateTotals();
  }

  calculateItemAmount(quantity: number, rate: number): number {
  return quantity * rate;
}

  // Remove an item
  removeItem(index: number) {
    this.items.removeAt(index);
    this.calculateTotals();
  }

  // Calculate totals
  calculateTotals() {
    debugger
    const items = this.invoiceForm.value.items;
    this.subtotal = items.reduce(
      (acc: number, item: { quantity: number; rate: number }) =>
        acc + item.quantity * item.rate,
      0
    );

    const discount = (this.subtotal * this.invoiceForm.value.discount) / 100;
    const tax = ((this.subtotal - discount) * this.invoiceForm.value.tax) / 100;
    debugger
    this.total = this.subtotal - discount + tax;
    this.balanceDue = this.total - this.invoiceForm.value.amountPaid;
  }

  // Submit the form
  onSubmit() {
    console.log(this.invoiceForm.value);
    alert('Invoice Submitted');
  }
}
