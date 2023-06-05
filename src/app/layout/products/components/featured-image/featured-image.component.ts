import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-featured-image',
  templateUrl: './featured-image.component.html',
  styleUrls: ['./featured-image.component.scss']
})
export class FeaturedImageComponent {
  @Input() src = "";
  @Input() alt = "";
}
