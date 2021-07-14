import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FileService } from '../services/file.service';
import { FileResponse } from '../payload/file.response';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OverlayRef } from '@angular/cdk/overlay';

@Component({
  selector: 'app-add-lecture',
  templateUrl: './add-lecture.component.html',
  styleUrls: ['./add-lecture.component.scss']
})
export class AddLectureComponent implements OnInit, OnDestroy {

  public lectureForm: FormGroup;
  public submitted: boolean = false;
  private $destroy: Subject<boolean> = new Subject<boolean>();
  public overlayRef: OverlayRef;
  public filenames: string[] = [];
  public fileResponse = new FileResponse();
  public categories = ['Maths', 'Physics', 'Programming'];

  constructor(
    private fileService: FileService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    /* Lecture Form validations. (only required currently) */
    this.lectureForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      video: ['', [Validators.required]],
      category: ['', [Validators.required]]
    });
  }

  /**
  * Get the controls of the login form.
  * 
  * @returns the controls of the login form
  */
  get f() { return this.lectureForm.controls }

  public onUploadFile(files: File[]): void {
    const formData = new FormData();
    formData.append('file', files[0], files[0].name);
    this.fileService.uploadFile(formData).subscribe(
      response => {
        this.fileResponse = response;
        this.toastrService.success("File uploaded successfully!")
        console.log(this.fileResponse);
      },
      (error: HttpErrorResponse) => {
        this.toastrService.error('Could not upload file!');
      }
    );
  }

  public onDownloadFile(filename: string): void {
    this.fileService.downloadFile(filename).subscribe(
      response => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        this.toastrService.error('Could not download file!');
      }
    );
  }

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
  }
}
