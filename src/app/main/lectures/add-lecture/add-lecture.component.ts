import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FileService } from '../services/file.service';
import { saveAs } from 'file-saver';
import { FileResponse } from '../payload/file.response';

@Component({
  selector: 'app-add-lecture',
  templateUrl: './add-lecture.component.html',
  styleUrls: ['./add-lecture.component.scss']
})
export class AddLectureComponent implements OnInit {

  public filenames: string[] = [];
  public fileStatus = { status: '', requestType: '', percent: 0 };
  public fileResponse = new FileResponse();

  constructor(
    private fileService: FileService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
  }

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
}
