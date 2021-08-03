import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FileService } from '../services/file.service';
import { FileResponse } from '../payload/file.response';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OverlayRef } from '@angular/cdk/overlay';
import { LectureService } from '../services/lecture.service';
import { LectureRequest } from '../payload/lecture.request';
import { LectureResponse } from '../payload/lecture.response';
import { ProgressSpinnerComponent } from '../../common-components/progress-spinner/progress-spinner.component';
import { ProgressSpinnerService } from '../../common-components/progress-spinner/progress-spinner.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-lecture',
  templateUrl: './add-lecture.component.html',
  styleUrls: ['./add-lecture.component.scss'],
})
export class AddLectureComponent implements OnInit, OnDestroy {
  public lectureForm: FormGroup;
  public submitted: boolean = false;
  private $destroy: Subject<boolean> = new Subject<boolean>();
  public overlayRef: OverlayRef;
  public filenames: string[] = [];
  public fileResponse = new FileResponse();
  public lectureRequest = new LectureRequest();
  public lectureResponse = new LectureResponse();
  public categories = ['Maths', 'Physics', 'Programming'];

  constructor(
    private fileService: FileService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private lectureService: LectureService,
    private progressSpinnerService: ProgressSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    /* Lecture Form validations. (only required currently) */
    this.lectureForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      // video: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }

  /**
   * Get the controls of the login form.
   *
   * @returns the controls of the login form
   */
  get f() {
    return this.lectureForm.controls;
  }

  public createLecture(): void {
    this.openProgressSpinner();
    this.lectureRequest = this.lectureForm.value;
    this.submitted = true;
    this.lectureService
      .addLecture(this.lectureRequest)
      .pipe(takeUntil(this.$destroy))
      .subscribe((response) => {
        this.lectureResponse = response;
        this.router.navigate(['lectures']);
        this.toastrService.success('Lecture created successfully!');
        this.progressSpinnerService.close(this.overlayRef);
      });
  }

  public openProgressSpinner(): void {
    this.overlayRef = this.progressSpinnerService.open(
      { hasBackdrop: true },
      ProgressSpinnerComponent
    );
  }

  // public onUploadFile(files: File[]): void {
  //   const formData = new FormData();
  //   formData.append('file', files[0], files[0].name);
  //   this.fileService.uploadFile(formData).subscribe(
  //     (response) => {
  //       this.fileResponse = response;
  //       this.toastrService.success('File uploaded successfully!');
  //       console.log(this.fileResponse);
  //     },
  //     (error: HttpErrorResponse) => {
  //       this.toastrService.error('Could not upload file!');
  //     }
  //   );
  // }

  // public onDownloadFile(filename: string): void {
  //   this.fileService.downloadFile(filename).subscribe(
  //     (response) => {
  //       console.log(response);
  //     },
  //     (error: HttpErrorResponse) => {
  //       this.toastrService.error('Could not download file!');
  //     }
  //   );
  // }

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
  }
}
