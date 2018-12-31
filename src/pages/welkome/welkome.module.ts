import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelkomePage } from './welkome';

@NgModule({
  declarations: [
    WelkomePage,
  ],
  imports: [
    IonicPageModule.forChild(WelkomePage),
  ],
})
export class WelkomePageModule {}
