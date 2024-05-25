import { Component, Input, OnChanges } from '@angular/core';
import { GIcon, PIcon } from 'src/app/shared/enums/icons.enum';
import { Annonce } from 'src/app/shared/models/annonce.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { Image } from 'primeng/image';

@Component({
  selector: 'app-pictures',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss'],
})
export class PicturesComponent implements OnChanges {
  @Input() isEdit = false;
  @Input() annonce!: Annonce;
  mainImage!: File;
  mainImageUrl?: string = '';
  images: any[] = [];
  imagesUrl: any[] = [];
  GIcon = GIcon;
  PIcon = PIcon;

  isMainImageTouched = false;
  areImagesTouched = false;
  moreThanTenUploaded = false;

  ngOnChanges(): void {
    if (this.isEdit) {
      this.patchForm();
    }
  }

  patchForm() {
    this.mainImageUrl = this.annonce.principlePhoto;
    this.imagesUrl = this.annonce.photos || [];
  }

  onMainImageUpload(event: any) {
    this.isMainImageTouched = true;
    this.mainImage = <File>event.target.files[0];

    if (this.mainImage) {
      this.mainImageUrl = URL.createObjectURL(this.mainImage);
      return;
    }

    this.mainImageUrl = undefined;
  }

  onMultipleImagesUpload(event: any) {
    this.areImagesTouched = true;
    this.images = event.target.files;
    this.imagesUrl = [];

    if (this.images.length > 10) {
      this.moreThanTenUploaded = true;
      return;
    }

    this.moreThanTenUploaded = false;

    for (let image of this.images) {
      const blob = URL.createObjectURL(image);
      this.imagesUrl.push(blob);
    }
  }

  onShow(event: Image) {
    event.closeButton?.nativeElement.click();
  }

  getValue() {
    if (this.isEdit) {
      return this.getUpdateModeValue();
    }

    return this.getCreateModeValue();
  }

  getCreateModeValue() {
    this.isMainImageTouched = true;
    this.areImagesTouched = true;

    if (!this.mainImage || this.images.length < 2) {
      return null;
    }

    return { mainImage: this.mainImage, images: this.images };
  }

  getUpdateModeValue() {
    if (
      (this.isMainImageTouched && !this.mainImage) ||
      (this.areImagesTouched && this.images.length < 2)
    ) {
      return null;
    }

    const pictures = { mainImage: this.mainImage, images: this.images };

    return pictures;
  }
}
