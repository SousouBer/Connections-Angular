export class ValidUser {
  constructor(public uid: string, private _token: string) {}

  get token() {
    return this._token;
  }
}
