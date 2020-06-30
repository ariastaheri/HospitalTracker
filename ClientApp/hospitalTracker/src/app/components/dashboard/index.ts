export class Patient {
  _id: string;
  name: string;
  gender: string;
  visits: Array<Visit>;
  DOB: Date;
  history: string;
}

export class Visit {
  _id: string;
  date: Date;
  diagnosis: string;
  tests: string;
  meds: string;
  symptoms: string;
}
