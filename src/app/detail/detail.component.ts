import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { Beer } from '../interfaces/beer.interface';
import { PunkApiService } from '../services/punk-api.service';
@Component({
  selector: 'app-detail',
  template: ``,
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  constructor(public dialog: MatDialog, private route: ActivatedRoute, private router: Router) {
    //subscribe(once) to the current route params
    this.route.params
      .pipe(take(1))
      .subscribe(params => {
        //open the modal with the beer id as params
        let dialogRef = this.dialog.open(DetailDialogComponent, {
          width: '700px',
          data: { beerId: this.route.snapshot.params['beerId'] }
        })
        //navigate back to the root page on modal close.
        dialogRef.afterClosed()
          .pipe(take(1))
          .subscribe(data => {
            this.router.navigateByUrl('');
          });
      });
  }

  ngOnInit() {
  }

}

/**
 * Dialog Component
 */

@Component({
  selector: 'app-detail-dialog',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailDialogComponent {
  public beer: Beer;
  public loaded: boolean = false;
  constructor(
    private api: PunkApiService,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<DetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    //get the beer id passed from the parent component and use it to fetch the current beer details.
    this.loadBeer(this.data.beerId);
  }

  loadBeer(beerId): void {
    this.loaded = false;
    this.api.getBeer(beerId).subscribe(data => {
      this.beer = data;
    }, err => {
      this.close();
      alert('An error has occurred while fetching this beer\'s details');
    }, () => {
      this.loaded = true;
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }

}
