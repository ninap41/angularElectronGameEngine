import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "spacer" })
export class SpacerPipe implements PipeTransform {
  transform(data: string, index): any {
    if (data) {
      return data.substr(0, index) + " " + data.substr(index, 100);
    }
  }
}
