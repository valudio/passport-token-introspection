import * as passport from 'passport-strategy';

export interface IStrategyOptions {
  passReqToCallBack?: boolean;
}

export interface IRequest {
  body: Object;
}

export class Strategy extends passport.Strategy {

  public name: string;
  private _verify: Function;
  private _passReqToCallBack: boolean;

  constructor(options: Function | IStrategyOptions, verify?: Function) {
    super();
    if (typeof options === 'function') {
      verify = options;
      options = {};
    }
    if (!verify) throw new Error('passport-token-introspection requires a verify function');
    this.name = 'passport-token-introspection';
    this._verify = verify;
    this._passReqToCallBack = options.passReqToCallBack;
  }

  public authenticate(req: IRequest) {
    if (!req.body) { return this.fail(0); }
    
    const token = req.body['token'];
    const tokenHint = req.body['token_type_hint'];
    const id = req.body['id'];
    const secret = req.body['secret'];

    if (!token || !id || !secret) {
      return this.fail(0);
    }
  
    const self = this;

    function verified(err, resourceServer, info){
      if (err) { return self.error(err); }
      if (!resourceServer) { return self.fail(0); }
      self.success(resourceServer, info);
    }

    if(this._passReqToCallBack) {
      this._verify(req, id, secret, verified);
    }else {
      this._verify(id, secret, verified);
    }
  }
}

