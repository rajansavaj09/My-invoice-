import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HelpComponent } from './help/help.component';
import { InvoicingGuideComponent } from './invoicing-guide/invoicing-guide.component';
import { FooterComponent } from './footer/footer.component';
import { HistoryComponent } from './history/history.component';
import { DashLayoutComponent } from './dash-layout.component';
import { SettingsComponent } from './settings/settings.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { MyInvoicesComponent } from './my-invoices/my-invoices.component';

const routes: Routes = [
  { path: '', component: DashLayoutComponent },
  { path: 'edit/:id', component: DashLayoutComponent },
  // { path: 'navbar', component: NavbarComponent },
  { path: 'help', component: HelpComponent },
  { path: 'invoicing-guide', component: InvoicingGuideComponent },
  // { path: 'footer', component: FooterComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'my-invoices', component: MyInvoicesComponent },
  { path: 'upgrade', component: UpgradeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashLayoutRoutingModule {}
