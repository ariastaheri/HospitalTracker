export class Patient {
  _id: string;
  name: string;
  gender: string;
  visits: Array<Visit>;
  dateOfBirth: string;
  history: string;
}

export class Visit {
  _id: string;
  dateOfVisit: string;
  diagnosis: string;
  tests: string;
  prescription: string;
  symptoms: string;
}
