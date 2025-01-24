// export interface invoiceInterface{
//       id?:0,
//       imagePath?: "",
//       type?:"INVOICE",
//       invoiceNo?:0,

//       formName?:"",
//       labelBillToMe?:"",
//       WhoIsThisToValue?:"",
//       labelShipTo?:"",
//       optionalValue?:"",

//       date?:"",
//       DateValue?:"",
//       paymentTerms?:"",
//       paymentTermsValue?:"",
//       dueDate?:"",
//       dueDateValue?:"",
//       poNumber?:"",
//       poNumberValue?:"",

//       labelItemName?:"",
//       labelQuantity?:"",
//       labelCost?:"",
//       labelAmount?:"",

//       items?:"",
//       description?:"",
//       quantity?:0,
//       rate?:0,
//       amount?:0,

//       labelNotes?:"",
//       valueNotes?:"",

//       labelTerms?:"",
//       valueTerms?:"",

//       labelSubtotal?:"",
//       valueSubtotal?:0,
//       labelDiscount?:"",
//       valueDiscount?:0,
//       labelTax?:"",
//       valueTax?:0,
//       labelShipping?:"",
//       valueShipping?:0,
//       labelTotal?:"",
//       valueTotal?:0,
//       labelAmountPaid?:"",
//       valueAmountPaid?:0,
//       labelBalanceDue?:"",
//       valueBalanceDue?:0,
      

// }

export interface invoiceInterface {
      id?: 0;
      imagePath?: string;
      type?: string;
      invoiceNo?: number;
      formName?: string;
      labelBillToMe?: string;
      WhoIsThisToValue?: string;
      labelShipTo?: string;
      optionalValue?: string;
      date?: string;
      DateValue?: string;
      paymentTerms?: string;
      paymentTermsValue?: string;
      dueDate?: string;
      dueDateValue?: string;
      poNumber?: string;
      poNumberValue?: string;
      labelItemName?: string;
      labelQuantity?: string;
      labelCost?: string;
      labelAmount?: string;
      items?: { description: string; quantity: number; rate: number; amount: number }[];
      labelNotes?: string;
      valueNotes?: string;
      labelTerms?: string;
      valueTerms?: string;
      labelSubtotal?: string;
      valueSubtotal?: number;
      labelDiscount?: string;
      valueDiscount?: number;
      labelTax?: string;
      valueTax?: number;
      labelShipping?: string;
      valueShipping?: number;
      labelTotal?: string;
      valueTotal?: number;
      labelAmountPaid?: string;
      valueAmountPaid?: number;
      labelBalanceDue?: string;
      valueBalanceDue?: number;
    }
    