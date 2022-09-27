import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private messageService: MessageService) {}

  showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Sukces!',
      detail: message,
    });
  }

  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Błąd!',
      detail: message,
    });
  }
}
