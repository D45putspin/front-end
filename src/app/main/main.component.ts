import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';

import { Chart } from 'chart.js';
import { gql, Apollo, QueryRef } from 'apollo-angular';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute,
} from '@angular/router';
import { CheckUser } from '../graphql/mutations/checkuser';
import { CheckBalance } from '../graphql/mutations/checkBalance';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getPositionQueue } from '../graphql/mutations/queue';
import { MintIt } from '../graphql/mutations/mint';
import { howManyMinted } from '../graphql/mutations/howManyMinted';
import { MatDialog } from '@angular/material/dialog';
import { setNft } from 'src/app/graphql/mutations/setNft';
import { stakeNft } from '../graphql/mutations/stakeNft';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements AfterViewInit {
  canvas: any;
  ctx: any;
  @ViewChild('myChart') myChart: any;
  @ViewChild('textElement') textElement: ElementRef;
  @ViewChild('blinkElement') blinkElement: ElementRef;

  @Input() wordArray: string[] = [
    'Loading Bullz Club Staking Program BETA....',
  ];
  @Input() textColor = 'White';
  @Input() fontSize = '2.5vw';
  @Input() blinkWidth = '0.1vw';
  @Input() typingSpeedMilliseconds = 200;
  @Input() deleteSpeedMilliseconds = 300;

  private i = 0;
  nftData;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private renderer: Renderer2,
    public dialog: MatDialog,
    private apollo: Apollo
  ) {}
  introducted = false;
  ngAfterViewInit(): void {
    this.initVariables();
    this.typingEffect();
  }

  private initVariables(): void {
    this.renderer.setStyle(
      this.textElement.nativeElement,
      'color',
      this.textColor
    );
    this.renderer.setStyle(
      this.textElement.nativeElement,
      'font-size',
      this.fontSize
    );
    this.renderer.setStyle(this.textElement.nativeElement, 'padding', '0.1em');

    this.renderer.setStyle(
      this.blinkElement.nativeElement,
      'border-right-width',
      this.blinkWidth
    );
    this.renderer.setStyle(
      this.blinkElement.nativeElement,
      'border-right-color',
      this.textColor
    );
    this.renderer.setStyle(
      this.blinkElement.nativeElement,
      'font-size',
      this.fontSize
    );
  }

  private typingEffect(): void {
    const word = this.wordArray[this.i].split('');
    const loopTyping = () => {
      if (word.length > 0) {
        this.textElement.nativeElement.innerHTML += word.shift();
      } else {
        this.deletingEffect();
        return;
      }
      setTimeout(loopTyping, this.typingSpeedMilliseconds);
    };
    loopTyping();
  }
  insertToStake() {}
  private deletingEffect(): void {
    this.renderer.setStyle(this.blinkElement.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.textElement.nativeElement, 'display', 'none');

    this.introducted = true;
  }
  registerNft() {
    var tokenn = localStorage.getItem('token');
    console.log(tokenn);
    if (tokenn) {
      this.apollo
        .mutate({
          mutation: setNft,
          variables: {
            token: tokenn,
          },
        })
        .subscribe(
          ({ data }) => {
            const usingData = data as any;
            this.nftData = usingData.setNftData;
            console.log(data);
          },
          (error) => {
            this.router.navigate(['']);
            this._snackBar.open('Authentication error', 'Login again', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          }
        );
    }
  }
  stakeNft() {
    var tokenn = localStorage.getItem('token');
    console.log(tokenn);
    if (tokenn) {
      this.apollo
        .mutate({
          mutation: stakeNft,
          variables: {
            nftId: this.nftData,
            poolId: '6201aa7cdf0fa82f34235395',
            token: tokenn,
          },
        })
        .subscribe(
          ({ data }) => {
            const usingData = data as any;

            console.log(data);
          },
          (error) => {
            this.router.navigate(['']);
            this._snackBar.open('Authentication error', 'Login again', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          }
        );
    }
  }
}
