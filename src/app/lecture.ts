export interface ILecture {
  name: string,
  author: string,
  level: LectureLevels,
  language: Languages
}

export class Lecture {
  public name: string = '';
  public author: string = '';
  public level: LectureLevels = LectureLevels.ACADEMIC;
  public language: Languages = Languages.en;

  constructor(data?: ILecture) {
    if (data) {
      Object.keys(this).forEach(field => this[field] = data[field]);
    }
  }
}

export enum Languages {
  'ru', 'en'
}

export enum LectureLevels {
  'HOT', 'INTERMEDIATE', 'ADVANCED', 'HARDCORE', 'ACADEMIC'
}

export interface IFilter {
  field: string,
  options: IOption[]
}

export interface IOption {
  value: string;
  isChecked: boolean;
}
