import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForbiddenPageComponent } from './forbidden-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ForbiddenPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ForbiddenPageComponent,
      },
    ]),
  ],
})
export class ForbiddenPageModule {}
