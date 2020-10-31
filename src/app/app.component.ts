import { Component } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { threadId } from 'worker_threads';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PreAdventure';
  darkMode = false;

  changeTheme() {
    if(this.darkMode) {
      document.body.classList.remove("theme-alternate");
      this.darkMode = false;
    } else {
      document.body.classList.add("theme-alternate");
      this.darkMode = true;
    }
  }
}
