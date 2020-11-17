export class Usuario {

  constructor(
    public id: number,
    public email: string,
    // tslint:disable-next-line: variable-name
    public first_name: string,
    // tslint:disable-next-line: variable-name
    public last_name: string,
    public avatar: string
  ) {
  }
}
