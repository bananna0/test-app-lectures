import { Component, OnInit } from '@angular/core';
import { LectureService } from '../lecture.service';
import { Lecture, IFilter } from '../lecture';

const languages = ['ru', 'en'],
  lectureLevels = ['HOT', 'INTERMEDIATE', 'ADVANCED', 'HARDCORE', 'ACADEMIC'];

@Component({
  selector: 'app-board',
  providers: [ LectureService ],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  lectures: Lecture;

  checkBoxFilters: IFilter[] = [];

  searchText = '';

  constructor(private lectureService: LectureService) { }

  ngOnInit() {
    this.lectureService.subscribeLectures().subscribe(data => this.lectures = data);
    this.checkBoxFilters.push(<IFilter> {
      field: 'language',
      options: languages.map(lng => {
        return {
          value: lng,
          isChecked: false
        }
      })
    });
    this.checkBoxFilters.push(<IFilter> {
      field: 'level',
      options: lectureLevels.map(level => {
        return {
          value: level,
          isChecked: false
        }
      })
    });
    this.getLectures();
  }

  getLectures(): void {
    this.lectureService.getLectures(this.checkBoxFilters, this.searchText);
  }

  onToggled() {
    this.getLectures();
  }

  filterByText() {
    this.searchText = this.searchText.substring(0, 500);
    this.getLectures();
  }

  onReset() {
    this.checkBoxFilters.forEach(filter => filter.options.forEach(option => option.isChecked = false));
    this.searchText = '';
    this.getLectures();
  }
}
