// highlight.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
  transform(value: string, searchText: string): string {
    searchText = '';
    if (!value || !searchText) {
      return value;
    }

    // Ensure value is a string
    const text = value.toString();

    // Use a regular expression to perform case-insensitive search
    const pattern = searchText.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    const regex = new RegExp(pattern, 'gi');

    return searchText ? text.replace(regex, (match) => `<span class="highlight">${match}</span>`) : text;
  }
}
