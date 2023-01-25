import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Firm } from '../../models/firm';
import { environment } from '../../../../environments/environment';
import { AlertService } from '../../services/alert-service/alert.service';
import { HideSidebarTriggerService } from '../../services/hide-sidebar-trigger/hide-sidebar-trigger.service';
import { ReloadDataTriggerService } from '../../services/reload-data-trigger/reload-data-trigger.service';
import { UserSettingsService } from '../../services/user-settings/user-settings.service';

@Component({
  selector: 'app-firm-edit-form',
  templateUrl: './firm-edit-form.component.html',
  styleUrls: ['./firm-edit-form.component.scss'],
})
export class FirmEditFormComponent implements OnInit {
  BASE_API_URL: string = environment.apiUrl;
  @Input() firm: Firm;
  form: FormGroup;
  serverErrors: any = [];
  isSubmitted: boolean = false;
  firmLogo: File;
  firmLogoSrc: string | ArrayBuffer | null = '';
  photoChanged: boolean = false;
  loading: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private alertService: AlertService,
    private hideSidebarTrigger: HideSidebarTriggerService,
    private reloadDataTrigger: ReloadDataTriggerService,
    private userSettingsService: UserSettingsService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      NIP: [null, [Validators.required, Validators.pattern(/^(\d{10})$/)]],
      REGON: [null, [Validators.required, Validators.pattern(/^(\d{9})$/)]],
      street: [],
      number: [null, [Validators.required]],
      locality: [null, [Validators.required]],
      zip_code: [
        null,
        [Validators.required, Validators.pattern(/^(\d){2}-(\d){3}$/)],
      ],
      firm_logo: [],
    });
    this.form.patchValue(this.firm);
    this.setPhoto();
  }
  get f() {
    return this.form.controls;
  }
  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    const formData = new FormData();
    formData.append('firm_id', this.firm.id.toString());
    formData.append('name', this.form.controls['name'].value);
    formData.append('NIP', this.form.controls['NIP'].value);
    formData.append('REGON', this.form.controls['REGON'].value);
    formData.append('street', this.form.controls['street'].value);
    formData.append('number', this.form.controls['number'].value);
    formData.append('locality', this.form.controls['locality'].value);
    formData.append('zip_code', this.form.controls['zip_code'].value);
    formData.append('photo_changed', this.photoChanged ? 'true' : 'false');
    if (this.firmLogoSrc !== '') {
      formData.append('firm_logo', this.firmLogo, this.firmLogo.name ?? 'logo');
    }
    this.updateFirm(formData);
  }

  onChangeFirmLogo(event: any) {
    this.firmLogo = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => (this.firmLogoSrc = reader.result);
    reader.readAsDataURL(this.firmLogo);
  }

  deleteFirmLogo() {
    this.firmLogoSrc = '';
    this.firmLogo = null as any;
    this.photoChanged = true;
    this.f['firm_logo'].patchValue('');
    this.form.markAsDirty();
  }

  setPhoto() {
    this.http
      .get(`${this.BASE_API_URL}/api/image/${this.firm.logo}`, {
        responseType: 'blob',
      })
      .subscribe((result) => {
        this.firmLogo = new File([result], 'photo');
      });
    this.firmLogoSrc = this.firm.logo_url;
  }

  updateFirm(formData: FormData) {
    this.userSettingsService.editFirm(formData).subscribe({
      next: (result) => {
        this.alertService.showSuccess('Dane pomyślnie zaktualizowane');
        this.afterRequestSuccess();
        this.loading = false;
      },
      error: (err) => {
        this.alertService.showError('Błąd podczas aktualizacji danych');
        this.loading = false;
        if (err.error.errors) this.serverErrors = err.error.errors;
      },
    });
  }

  afterRequestSuccess() {
    this.reloadDataTrigger.triggerUserInfoReload();
    this.hideSidebarTrigger.triggerAddFirmUserSidebarHide();
    this.form.reset();
    this.firmLogoSrc = '';
    this.firmLogo = null as any;
    this.loading = false;
  }
}
