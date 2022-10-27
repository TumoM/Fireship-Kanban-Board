import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {

  isHandset$: Observable<boolean> = this.bpObserver.observe(Breakpoints.Handset)
    .pipe(
      map(res => res.matches), // 'destructure' the results and only return the matches
      shareReplay()
    );

  constructor(private bpObserver: BreakpointObserver) { }


}
