import { Component, EventEmitter, Output, Input } from "@angular/core";

@Component({
  selector: 'app-styled-btn',
  templateUrl: './styled-btn.component.html',
  styleUrls: ['./styled-btn.component.scss']
})
export class StyledBtnComponent {
  @Input() btnType: "submit" | "button" | "menu" | "reset" = "button";
  @Output() clickEvent = new EventEmitter();
}
