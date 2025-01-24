import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashLayoutRoutingModule } from './dash-layout-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from "./footer/footer.component";
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HelpComponent } from './help/help.component';
import { InvoicingGuideComponent } from './invoicing-guide/invoicing-guide.component';
import { HistoryComponent } from './history/history.component';
import { DashLayoutComponent } from './dash-layout.component';
import { SettingsComponent } from './settings/settings.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { MyInvoicesComponent } from './my-invoices/my-invoices.component';
// import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    NavbarComponent,
    HelpComponent,
    InvoicingGuideComponent,
    FooterComponent,
    HistoryComponent,
    DashLayoutComponent,
    SettingsComponent,
    UpgradeComponent,
    MyInvoicesComponent

  ],
  imports: [
    CommonModule,
    DashLayoutRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    
    
  ],
  providers: [],
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class DashLayoutModule { }
