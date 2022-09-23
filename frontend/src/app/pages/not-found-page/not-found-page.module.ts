import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from './not-found-page.component';
import { CoreModule } from '../../core/core.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NotFoundPageComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild([
      {
        path: '',
        component: NotFoundPageComponent,
      },
    ]),
  ],
})
export class NotFoundPageModule {}
