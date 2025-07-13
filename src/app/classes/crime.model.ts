import { Status, Suspect } from '../interfaces/crime.interface';

export abstract class Crime {
  constructor(
    public id: number,
    public location: string,
    public dateReported: string,
    public dateOccured: string,
    public severity: string,
    public suspectInfo: Suspect,
    public status: Status,
    public type: string
  ) {}

  abstract investigate(): void;

  static fromJSON(json: any): Crime {
    switch (json.type) {
      case 'Theft':
        return new Theft(
          json.id,
          json.location,
          json.dateReported,
          json.dateOccured,
          json.severity,
          json.suspectInfo,
          json.status,
          json.type,
          json.itemStolen
        );
      case 'Arson':
        return new Arson(
          json.id,
          json.location,
          json.dateReported,
          json.dateOccured,
          json.severity,
          json.suspectInfo,
          json.status,
          json.type,
          json.residence
        );
      case 'Assault':
        return new Assault(
          json.id,
          json.location,
          json.dateReported,
          json.dateOccured,
          json.severity,
          json.suspectInfo,
          json.status,
          json.type,
          json.victimName
        );
      case 'Fraud':
        return new Fraud(
          json.id,
          json.location,
          json.dateReported,
          json.dateOccured,
          json.severity,
          json.suspectInfo,
          json.status,
          json.type,
          json.scamType
        );
      default:
        throw new Error('error ' + json.type);
    }
  }

  modifyStatus(status: Status): void {
    this.status = status;
  }

  reportSummary(): string {
    console.log('returing summarized crime info');
    return `Crime number ${this.id}, presumably occured on ${this.dateOccured} and reported on ${this.dateReported}. Investigation status: ${this.status}`;
  }
}

export class Theft extends Crime {
  constructor(
    id: number,
    location: string,
    dateReported: string,
    dateOccured: string,
    severity: string,
    suspectInfo: Suspect,
    status: Status,
    type: string,
    public itemStolen: string
  ) {
    super(
      id,
      location,
      dateReported,
      dateOccured,
      severity,
      suspectInfo,
      status,
      type
    );
  }

  override investigate(): string {
    this.status = 'Under Investigation';
    return `Investigating theft of ${this.itemStolen}... `;
  }
}

export class Fraud extends Crime {
  constructor(
    id: number,
    location: string,
    dateReported: string,
    dateOccured: string,
    severity: string,
    suspectInfo: Suspect,
    status: Status,
    type: string,
    public scamType: string
  ) {
    super(
      id,
      location,
      dateReported,
      dateOccured,
      severity,
      suspectInfo,
      status,
      type
    );
  }

  override investigate(): string {
    this.status = 'Under Investigation';
    return `Investigating ${this.scamType} fraud...`;
  }
}

export class Assault extends Crime {
  constructor(
    id: number,
    location: string,
    dateReported: string,
    dateOccured: string,
    severity: string,
    suspectInfo: Suspect,
    status: Status,
    type: string,
    public victimName: string
  ) {
    super(
      id,
      location,
      dateReported,
      dateOccured,
      severity,
      suspectInfo,
      status,
      type
    );
  }

  override investigate(): string {
    this.status = 'Under Investigation';
    return `Investigating assault on ${this.victimName}...`;
  }
}

export class Arson extends Crime {
  constructor(
    id: number,
    location: string,
    dateReported: string,
    dateOccured: string,
    severity: string,
    suspectInfo: Suspect,
    status: Status,
    type: string,
    public residence: string
  ) {
    super(
      id,
      location,
      dateReported,
      dateOccured,
      severity,
      suspectInfo,
      status,
      type
    );
  }

  override investigate(): string {
    this.status = 'Under Investigation';
    return `Investigating arson of ${this.residence}...`;
  }
}
