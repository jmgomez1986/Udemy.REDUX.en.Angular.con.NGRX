import { stringify } from 'querystring';

export class Usuario {
  constructor(
    public uid: string,
    public nombre: string,
    public email: string
  ) {}
}
