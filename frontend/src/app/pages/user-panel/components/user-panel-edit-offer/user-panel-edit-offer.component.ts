import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { OfferType } from '../../../../shared/models/offer-type';
import { PropertyType } from '../../../../shared/models/property-type';
import { PropertyParameter } from '../../../../shared/models/property-parameter';
import { ParameterCategory } from '../../../../shared/models/parameter-category';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../shared/services/api/api.service';
import { AddOfferService } from '../../../../shared/services/add-offer/add-offer.service';
import { MessageService } from 'primeng/api';
import { finalize, tap } from 'rxjs';

@Component({
  selector: 'app-user-panel-edit-offer',
  templateUrl: './user-panel-edit-offer.component.html',
  styleUrls: ['./user-panel-edit-offer.component.scss'],
})
export class UserPanelEditOfferComponent implements OnInit {
  offerType: string;
  propertyType: string;
  addOfferForm: FormGroup;
  offerTypeId: number;
  propertyTypeId: number;
  offerTypes: OfferType[] = [];
  propertyTypes: PropertyType[] = [];
  propertyParameters: PropertyParameter[];
  dataLoaded: boolean = false;
  parameterCategories: ParameterCategory[] = [];
  loading: boolean = false;
  mainPhoto: File;
  mainPhotoSrc: string | ArrayBuffer | null = '';
  isSubmitted: boolean = false;

  files: { file: File; src: string | ArrayBuffer | null }[] = [
    { file: null as any, src: '' },
    { file: null as any, src: '' },
    { file: null as any, src: '' },
    { file: null as any, src: '' },
    { file: null as any, src: '' },
  ];
  serverErrors: any = [];
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private addOfferService: AddOfferService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.offerType = this.route.snapshot.routeConfig?.path?.split('/')[1]!;
    this.propertyType = this.route.snapshot.routeConfig?.path?.split('/')[0]!;
    switch (this.propertyType) {
      case 'dzialka': {
        this.propertyType = 'działka';
        break;
      }
      case 'pokoj': {
        this.propertyType = 'pokój';
        break;
      }
    }
    if (this.offerType === 'sprzedaz') {
      this.offerType = 'sprzedaż';
    }
    this.apiService
      .getPropertyAndOfferTypes()
      .pipe(
        tap((result) => {
          this.offerTypes = result.offerTypes;
          this.propertyTypes = result.propertyTypes;
          this.offerTypeId = this.offerTypes.find(
            (x) => x.name === this.offerType
          )!.id;
          this.propertyTypeId = this.propertyTypes.find(
            (x) => x.name === this.propertyType
          )!.id;

          this.apiService
            .getParametersForPropertyType(this.propertyTypeId)
            .pipe(
              finalize(() => {
                this.getParametersCategories();
                this.setFormControls();
                this.dataLoaded = true;
              })
            )
            .subscribe((result) => {
              this.propertyParameters = result;
            });
        })
      )
      .subscribe();

    this.addOfferForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(10)]],
      propertyType: [null, [Validators.required]],
      offerType: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.min(1)]],
      locality: [null, [Validators.required]],
      areaSquareMeters: [null, [Validators.required, Validators.min(1)]],
      description: [
        null,
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(1000),
        ],
      ],
      mainPhoto: [null, [Validators.required]],
    });
  }

  get f() {
    return this.addOfferForm.controls;
  }

  submitForm() {
    console.log(this.f['title'].errors);
    this.isSubmitted = true;
    if (this.addOfferForm.invalid) {
      return;
    }
    this.loading = true;
    let propertyParameters: { parameterId: number; value: string }[] = [];
    this.propertyParameters.forEach((parameter) => {
      if (this.addOfferForm.controls[parameter.name].value !== null) {
        if (parameter.type === 'boolean') {
          propertyParameters.push({ parameterId: parameter.id, value: '' });
        } else {
          propertyParameters.push({
            parameterId: parameter.id,
            value: this.addOfferForm.controls[parameter.name].value,
          });
        }
      }
    });
    let addOffer = {
      property_type_id: this.addOfferForm.controls['propertyType'].value,
      offer_type_id: this.addOfferForm.controls['offerType'].value,
      title: this.addOfferForm.controls['title'].value,
      area_square_meters: this.addOfferForm.controls['areaSquareMeters'].value,
      price: this.addOfferForm.controls['price'].value,
      locality: this.addOfferForm.controls['locality'].value,
      description: this.addOfferForm.controls['description'].value,
      parameters: propertyParameters,
    };
    const formData = new FormData();
    if (this.mainPhotoSrc !== '')
      formData.append('main_photo', this.mainPhoto, this.mainPhoto.name);
    this.files.forEach((x) => {
      if (x.file !== null) {
        formData.append('files[]', x.file, x.file.name);
      }
    });
    formData.append('addOffer', JSON.stringify(addOffer));
    this.addOfferService.addOffer(formData).subscribe({
      next: (value) => {
        console.log('succes', value);
        this.loading = false;
        this.router.navigate(['dodaj-ogloszenie/oferta-dodana']);
      },
      error: (err) => {
        console.log('error', err);
        this.serverErrors = err.error.errors;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message,
        });
        this.loading = false;
      },
    });
  }

  setFormControls() {
    this.addOfferForm.controls['propertyType'].setValue(this.propertyTypeId);
    this.addOfferForm.controls['offerType'].setValue(this.offerTypeId);
    this.propertyParameters.forEach((x) => {
      this.addOfferForm.addControl(x.name, new FormControl());
    });
  }

  getParametersCategories() {
    this.parameterCategories = this.propertyParameters
      .map((x) => {
        return x.parameter_category;
      })
      .filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.name === value.name)
      );
  }

  propertyTypeChange(event: any) {
    let propertyType = this.propertyTypes.find(
      (x) => x.id === event.value
    )!.name;
    switch (propertyType) {
      case 'działka': {
        propertyType = 'dzialka';
        break;
      }
      case 'pokój': {
        propertyType = 'pokoj';
        break;
      }
    }
    let offerType = this.offerTypes.find(
      (x) => x.id === this.addOfferForm.controls['offerType'].value
    )!.name;
    if (offerType === 'sprzedaż') {
      offerType = 'sprzedaz';
    }
    if (propertyType === 'pokoj') offerType = 'wynajem';
    this.router.navigate([
      '/dodaj-ogloszenie/' + propertyType + '/' + offerType,
    ]);
  }

  onChangeMainPhoto(event: any) {
    this.mainPhoto = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => (this.mainPhotoSrc = reader.result);
    reader.readAsDataURL(this.mainPhoto);
  }

  onChangePhoto(event: any) {
    let index = this.files.findIndex((x) => x.src === '');
    if (index !== undefined) {
      this.files[index].file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.files[index].src = reader.result);
      reader.readAsDataURL(this.files[index].file);
    }
  }

  deletePhoto(src: string | ArrayBuffer | null) {
    let index = this.files.findIndex((x) => x.src === src);
    if (index !== undefined) {
      this.files[index] = { file: null as any, src: '' };
    }
  }

  deleteMainPhoto() {
    this.mainPhotoSrc = '';
    this.f['mainPhoto'].setValue(null);
  }
}
