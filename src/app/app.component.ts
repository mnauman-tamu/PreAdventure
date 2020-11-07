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
  colorBlind = false;

  changeTheme() {
    if(this.colorBlind) {
      this.colorBlindThemes();
    } else if(this.darkMode) {
      document.body.classList.remove("theme-alternate");
      this.darkMode = false;
    } else {
      document.body.classList.add("theme-alternate");
      this.darkMode = true;
    }
  }

  colorBlindThemes() {
    if(this.darkMode) {
      document.body.classList.remove("theme-colorblind-alternate"); // need to make this theme
      document.body.classList.add("theme-colorblind"); // need to make this theme
      this.darkMode = false;
    } else {
      document.body.classList.remove("theme-colorblind");
      document.body.classList.add("theme-colorblind-alternate");
      this.darkMode = true;
    }
  }

  toggleColorBlind() {
    if(this.colorBlind) {
      if(this.darkMode) {
        document.body.classList.remove("theme-colorblind-alternate");
        document.body.classList.add("theme-alternate");
        this.colorBlind = false;
      } else {
        document.body.classList.remove("theme-colorblind");
        this.colorBlind = false;
      }
    } else {
      if(this.darkMode) {
        document.body.classList.remove("theme-alternate");
        document.body.classList.add("theme-colorblind-alternate");
        this.colorBlind = true;
      } else {
        document.body.classList.add("theme-colorblind");
        this.colorBlind = true;
      }
    }
  }

  toggleLargeFont() {
    document.body.classList.toggle("larger-text");
  }

}
