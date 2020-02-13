import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireUploadTask } from 'angularfire2/storage';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StorageService } from 'src/app/services/storage.service';
import { ChangesNotSavedComponent } from 'src/app/shared/changes-not-saved/changes-not-saved.component';

@Component({
  selector: 'dav-cooks-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.scss']
})
export class ImageEditComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();
  task: AngularFireUploadTask;
  uploadProgress$: Observable<number>;
  changed: boolean = false;

  imageForm = this.fb.group({
    url: ['']
  });

  constructor(
    public fb: FormBuilder,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ImageEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private storage: StorageService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.imageForm.patchValue({ url: this.data.imageUrl }, { emitEvent: false });
    this.imageForm.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(changes => {
        this.changed = (changes.url !== this.data.imageUrl);
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  get url() { return this.imageForm.get('url') as FormControl; }

  upload(event) {
    this.task = this.storage.uploadRecipeImage(event);
    this.uploadProgress$ = this.task.percentageChanges();
    this.task.then(result => {
      this.snackbar.open('Success! File added.', 'DISMISS', {
        duration: 2500,
        verticalPosition: 'top'
      });
      result.ref.getDownloadURL().then(url => {
        this.imageForm.patchValue({ url: url });
      });
    }).catch((err) => {
      console.log(err);
      this.snackbar.open('Error uploading file.', 'DISMISS', {
        duration: 3000,
        verticalPosition: 'top'
      });
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
