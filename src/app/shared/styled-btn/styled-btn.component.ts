import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-styled-btn',
  templateUrl: './styled-btn.component.html',
  styleUrls: ['./styled-btn.component.scss']
})
export class StyledBtnComponent {
  @Output() clickEvent = new EventEmitter();
}
