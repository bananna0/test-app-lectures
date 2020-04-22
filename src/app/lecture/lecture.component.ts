import { Component, OnInit, Input } from '@angular/core';

import { Lecture } from "../lecture";

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css']
})
export class LectureComponent implements OnInit {

  @Input() lecture: Lecture;

  constructor() { }

  ngOnInit() {}
}
