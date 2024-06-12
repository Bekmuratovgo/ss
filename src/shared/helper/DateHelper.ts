import { format } from "date-fns";

export class DateHelper {
  // format: 15.04.2020
  static getFormat(date: Date) {
    return format(date, "dd.MM.yyyy");
  }
}

