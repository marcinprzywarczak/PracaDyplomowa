import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { OfferType } from '../../shared/models/offer-type';
import { PropertyType } from '../../shared/models/property-type';
import { PropertyParameter } from '../../shared/models/property-parameter';
import { ParameterCategory } from '../../shared/models/parameter-category';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../shared/services/api/api.service';
import { AddOfferService } from '../../shared/services/add-offer/add-offer.service';
import { MessageService } from 'primeng/api';
import { finalize, tap } from 'rxjs';
import { Offer } from '../../shared/models/offer';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../shared/services/alert-service/alert.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.scss'],
})
export class EditOfferComponent implements OnInit {
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
  offer: Offer;
  photoChanged: boolean = false;

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
    private messageService: MessageService,
    private http: HttpClient,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    const id: number = +this.route.snapshot.paramMap.get('offerId')!;
    this.apiService
      .getOffer(id)
      .pipe(
        finalize(() => {
          this.buildForm();
          this.setPhotos();
          this.apiService
            .getPropertyAndOfferTypes()
            .pipe(
              finalize(() => {
                this.getParametersForProperty()
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
            .subscribe((result) => {
              this.offerTypes = result.offerTypes;

              this.propertyTypes = result.propertyTypes;
              if (
                this.propertyTypes.find((x) => x.id === this.propertyTypeId)!
                  .name === 'pokój'
              )
                this.offerTypes = this.offerTypes.filter(
                  (x) => x.name !== 'wynajem'
                );
            });
        })
      )
      .subscribe({
        next: (result) => {
          this.offer = result.offer;
          this.offerTypeId = this.offer.offer_type_id;
          this.propertyTypeId = this.offer.property_type_id;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getParametersForProperty() {
    return this.apiService.getParametersForPropertyType(this.propertyTypeId);
  }

  get f() {
    return this.addOfferForm.controls;
  }

  buildForm() {
    this.addOfferForm = this.formBuilder.group({
      title: [
        this.offer.title,
        [Validators.required, Validators.minLength(10)],
      ],
      propertyType: [this.offer.property_type_id, [Validators.required]],
      offerType: [this.offer.offer_type_id, [Validators.required]],
      price: [this.offer.price, [Validators.required, Validators.min(1)]],
      locality: [this.offer.locality, [Validators.required]],
      areaSquareMeters: [
        this.offer.area_square_meters,
        [Validators.required, Validators.min(1)],
      ],
      description: [
        this.offer.description,
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(1000),
        ],
      ],
      mainPhoto: ['', []],
    });
  }

  submitForm() {
    this.isSubmitted = true;
    if (this.addOfferForm.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.addOfferForm.controls);
    let propertyParameters: { parameterId: number; value: string }[] = [];
    this.propertyParameters.forEach((parameter) => {
      if (this.addOfferForm.controls[parameter.name].value !== null) {
        if (parameter.type === 'boolean') {
          if (this.addOfferForm.controls[parameter.name].value.length > 0) {
            propertyParameters.push({ parameterId: parameter.id, value: '' });
          }
        } else {
          propertyParameters.push({
            parameterId: parameter.id,
            value: this.addOfferForm.controls[parameter.name].value,
          });
        }
      }
    });
    let editOffer = {
      property_type_id: this.addOfferForm.controls['propertyType'].value,
      offer_type_id: this.addOfferForm.controls['offerType'].value,
      title: this.addOfferForm.controls['title'].value,
      area_square_meters: this.addOfferForm.controls['areaSquareMeters'].value,
      price: this.addOfferForm.controls['price'].value,
      locality: this.addOfferForm.controls['locality'].value,
      description: this.addOfferForm.controls['description'].value,
      parameters: propertyParameters,
      photo_changed: this.photoChanged,
      offer_id: this.offer.id,
    };
    const formData = new FormData();
    if (this.photoChanged) {
      if (this.mainPhotoSrc !== '')
        formData.append('main_photo', this.mainPhoto);
      this.files.forEach((x) => {
        if (x.file !== null) {
          formData.append('files[]', x.file, x.file.name);
        }
      });
    }
    formData.append('editOffer', JSON.stringify(editOffer));
    this.addOfferService.editOffer(formData).subscribe({
      next: (value) => {
        this.loading = false;
        this.alertService.showSuccess('Ogłoszenie pomyślnie zaktualizowane!');
        this.router.navigate(['uzytkownik/ogloszenia']);
      },
      error: (err) => {
        console.log('error', err);
        this.serverErrors = err?.error?.errors;
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
    this.propertyParameters.forEach((x) => {
      const param = this.offer.parameters?.find(
        (param) => param.name === x.name
      );
      this.addOfferForm.addControl(
        x.name,
        new FormControl(
          param
            ? param.type === 'boolean'
              ? [param.name]
              : param.pivot.value
            : null
        )
      );
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

  async propertyTypeChange(event: any) {
    this.dataLoaded = false;
    const oldPropertyParameters = this.propertyParameters;
    this.propertyTypeId = event.value;
    this.getParametersForProperty()
      .pipe(
        finalize(() => {
          this.getParametersCategories();
          this.setFormControls();
          this.deleteUnusedControls(oldPropertyParameters);
          this.dataLoaded = true;
        })
      )
      .subscribe((result) => {
        this.propertyParameters = result;
      });
  }

  deleteUnusedControls(oldPropertyParameters: PropertyParameter[]) {
    oldPropertyParameters.forEach((x) => {
      if (!this.propertyParameters.find((param) => param.name === x.name)) {
        this.addOfferForm.removeControl(x.name);
      }
    });
  }

  onChangeMainPhoto(event: any) {
    this.photoChanged = true;
    this.mainPhoto = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => (this.mainPhotoSrc = reader.result);
    reader.readAsDataURL(this.mainPhoto);
  }

  onChangePhoto(event: any) {
    this.photoChanged = true;
    let index = this.files.findIndex((x) => x.src === '');
    if (index !== undefined) {
      this.files[index].file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.files[index].src = reader.result);
      reader.readAsDataURL(this.files[index].file);
    }
  }

  deletePhoto(src: string | ArrayBuffer | null, index: number) {
    this.photoChanged = true;
    if (index !== undefined) {
      this.files[index] = { file: null as any, src: '' };
    }
  }

  deleteMainPhoto() {
    this.photoChanged = true;
    this.mainPhotoSrc = '';
    this.f['mainPhoto'].setValue(null);
  }

  setPhotos() {
    this.files = [];
    this.offer.photos?.forEach((photo) => {
      if (photo.pivot.isMain === 1) {
        this.http
          .get(`http://localhost:8000/api/image/${photo.path}`, {
            responseType: 'blob',
          })
          .subscribe((result) => {
            this.mainPhoto = new File([result], 'photo');
          });
        this.mainPhotoSrc = photo.photo_url;
        // this.addOfferForm.get('mainPhoto')?.setValue(this.mainPhotoSrc);
      } else {
        this.http
          .get(`http://localhost:8000/api/image/${photo.path}`, {
            responseType: 'blob',
          })
          .subscribe((result) => {
            this.files.push({
              file: new File([result], 'photo'),
              src: photo.photo_url,
            });
          });
      }
    });
  }
}
