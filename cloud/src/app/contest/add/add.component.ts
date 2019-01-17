import { Component, OnInit } from '@angular/core';
import { ImageService } from './../../image.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public selectedFile = null;
  public previewSrc = null;
  private newImageId = null;
  public canPost = false;

  constructor(
    private imageService: ImageService,
  ) { }

  ngOnInit() {
  }
  upload() {
    const _this = this;
    this.imageService.upload(this.selectedFile).then(response => {
      console.log(response);
      this.newImageId = response.data.uuid[0].value;
      _this.canPost = true;
    }).catch(error => console.log(error));

  }
  post () {
    this.imageService.post({
      data: {
        type: 'node--picture_post',
        attributes: {
          title: 'new',
        },
        relationships: {
          field_image: {
            data: {
              id: this.newImageId,
              type: 'file--file',
            }
          },
          field_school: {
            data: {
              type: 'taxonomy_term--schools',
              id: 'c09a9739-b033-46ae-88f8-744be6efcda7'
            }
          },
          field_contest: {
            data: {
              type: 'taxonomy_term--contest',
              id: '2df0a02c-ed66-40c1-ba99-f79205e3afcf'
            }
          }
        }
      }
    }).then(response => {
      console.log(response);
    }).catch(error => {

    })

  }
  onNewImage(event) {
    this.selectedFile = <File>event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      // put next line in comment or first time building will fail. uncomment and second build succeeds.
      // this.previewSrc = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

}
