import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'contact-section',
  templateUrl: './contact-section.component.html',
  styleUrls: ['./contact-section.component.scss']
})
export class ContactSectionComponent {
  constructor(private dialog: MatDialog) {}
  openContactForm() {
    this.dialog.open(ContactFormDialogComponent, {
      'width': '80%'
    });
  }
}

@Component({
  selector: 'contact-form-dialog',
  template: `
  <iframe src="https://formbuilder.hulkapps.com/corepage/customform?id=8px9gwJtLrWhKjs8i32ZIQ"
    id="frame_8px9gwJtLrWhKjs8i32ZIQ" frameborder="0" width="100%" style="height: 100%; min-height: 500px;"></iframe>
  `
})
export class ContactFormDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ContactFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
}
