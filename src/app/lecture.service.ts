import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Lecture, IFilter } from './lecture';
import { Subject } from 'rxjs';

@Injectable()
export class LectureService {

  data: Subject<Lecture> = new Subject();

  constructor(private http: HttpClient) {}

  public subscribeLectures() {
    return this.data;
  }

  public getLectures(filters: IFilter[], searchText: string) {
    return this.http.get('/app/mock/lectures.json')
      .subscribe(data => this.filterData(data, filters, searchText));
  }

  filterData(data, filters, searchText: string): void {
    const lectures = data.map(lecture => new Lecture(lecture));
    const preparedFilters = filters.map(filter => {
      return {
        field: filter.field,
        options: filter.options.reduce((accum, current) => {
          if (current.isChecked) { accum.push(current.value)}
          return accum;
        }, [])
      };
    }).filter(item => item.options.length);
    const filteredLectures = lectures.reduce((lecturePack, lecture) => {
      if(preparedFilters.every(filter => filter.options.includes(lecture[filter.field]))) {
        if (searchText) {
          if (lecture.author.toLowerCase().includes(searchText.toLowerCase())
            || lecture.name.toLowerCase().includes(searchText.toLowerCase())) {
            lecturePack.push(lecture);
          }
        } else {
          lecturePack.push(lecture);
        }
      }
      return lecturePack;
    }, []);


    this.data.next(filteredLectures);
  }
}
