import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenavContainer } from '@angular/material/sidenav';

import { RecipeEditComponent } from '../recipes/recipe-edit/recipe-edit.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'dav-cooks-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  @ViewChild(MatSidenavContainer) sidenavContainer: MatSidenavContainer;

  constructor(
    public auth: AuthService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public dialog: MatDialog
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.sidenavContainer.scrollable.elementScrolled().subscribe(() => /* react to scrolling */);
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  addRecipe() {
    const dialogRef = this.dialog.open(RecipeEditComponent, {
      height: '500px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
