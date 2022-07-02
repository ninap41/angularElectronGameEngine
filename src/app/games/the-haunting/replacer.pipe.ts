import { HtmlParser } from "@angular/compiler";
import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Pipe({ name: "replacer" })
export class ReplacerPipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {}
  transform(data: string): any {
    if (data) {
      let result = data
        .replace("*red-s*", "<span style='color: red'> ")
        .replace("*red-e*", "</span>")
        .replace("*blue-s*", "<span style='color: blue'> ")
        .replace("*blue-e*", "</span>")
        .replace("*pink-s*", "<span style='color: pink'> ")
        .replace("*pink-e*", "</span>")
        .replace("*purple-s*", "<span style='color: purple'> ")
        .replace("*purple-e*", "</ span>")
        .replace("*orange-s*", "<span style='color: orange'> ")
        .replace("*orange-e*", "</span>")
        .replace("*green-s*", "<span style='color: green'> ")
        .replace("*green-e*", "</span>")
        .replace("*CHARNAME*", "Brenda")
        .replace("*CHARENEMY*", "Lila")
        .replace("*CHARHOMETOWN*", "Lonely Grove")
        .replace("*CHARSTAT*", "*gs.user.stat");
      return this._sanitizer.bypassSecurityTrustHtml(result);
    }
  }
}
