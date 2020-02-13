import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { BaseUnsubscribeComponent } from 'src/app/shared/base-unsubscribe/base-unsubscribe.component';
import { ChangesNotSavedComponent } from 'src/app/shared/changes-not-saved/changes-not-saved.component';

@Component({
  selector: 'dav-cooks-orig-url-edit',
  templateUrl: './orig-url-edit.component.html',
  styleUrls: ['./orig-url-edit.component.scss']
})
export class OrigUrlEditComponent extends BaseUnsubscribeComponent implements OnInit {

  readonly reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  changed: boolean = false;
  urlForm = this.fb.group({
    url: ['', Validators.pattern(this.reg)]
  });

  constructor(
    public fb: FormBuilder,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<OrigUrlEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super();
  }

  get url() { return this.urlForm.get('url') as FormControl; }

  ngOnInit(): void {
    this.urlForm.patchValue({ url: this.data.originalURL });
    this.urlForm.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(changes => {
        this.changed = (changes.url !== this.data.originalURL);
      });
  }

  cancel() {
    if (this.changed) {
      const ref = this.dialog.open(ChangesNotSavedComponent, {
        disableClose: true,
        width: '300px'
      });
      ref.afterClosed().subscribe(result => {
        if (result) {
          this.dialogRef.close();
        }
      });
    }
    else {
      this.dialogRef.close();
    }
  }

  save() {
    this.dialogRef.close({
      url: this.url.value,
      changed: this.changed
    });
  }

}