import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IOption } from '../lecture';

@Component({
  selector: 'app-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.css']
})
export class CheckboxGroupComponent implements OnInit {

  @Input() options: IOption[];

  @Output() toggled = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  onToggle() {
    this.toggled.emit();
  }
}
