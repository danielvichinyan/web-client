import { OverlayRef } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProgressSpinnerComponent } from 'src/app/main/common-components/progress-spinner/progress-spinner.component';
import { ProgressSpinnerService } from 'src/app/main/common-components/progress-spinner/progress-spinner.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  public contactForm: FormGroup;
  public overlayRef: OverlayRef;

  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private progressSpinnerService: ProgressSpinnerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  public openProgressSpinner(): void {
    this.overlayRef = this.progressSpinnerService.open(
      { hasBackdrop: true },
      ProgressSpinnerComponent
    );
  }

  public contact(): void {
    this.openProgressSpinner();
    this.router.navigate(['welcome']);
    this.toastrService.success('You have contacted us successfully!');
    this.progressSpinnerService.close(this.overlayRef);
  }
}
