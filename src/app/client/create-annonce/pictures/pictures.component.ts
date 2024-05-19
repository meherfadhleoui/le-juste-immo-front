import { Component, OnInit } from '@angular/core';
import { GIcon, PIcon } from 'src/app/shared/enums/icons.enum';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-pictures',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss'],
})
export class PicturesComponent implements OnInit {
  mainImage!: File;
  mainImageUrl?: string = '';
  images: any[] = [];
  imagesUrl: any[] = [];
  GIcon = GIcon;
  PIcon = PIcon;

  isMainImageTouched = false;
  areImagesTouched = false;
  moreThanTenUploaded = false;

  ngOnInit(): void {}

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
      this.imagesUrl.push({
        itemImageSrc: blob,
        thumbnailImageSrc: blob,
      });
    }
  }

  getValue() {
    this.isMainImageTouched = true;
    this.areImagesTouched = true;

    if (!this.mainImage || this.images.length < 2) {
      return null;
    }

    return { mainImage: this.mainImage, images: this.images };
  }
}
