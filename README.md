# Passport Token Introspection Strategy

[![NPM](https://nodei.co/npm/passport-token-introspection.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/passport-token-introspection/)

It will expect: 

  - token: the value of the token.
  - token_type_hint: `access_token` or `refresh_token`. This is optional.
  - id: Id of the Resource Server making the call.
  - secret: Password of the Resource Server making the call.

`id` and `secret` will be passed to the `verify function`.

It's written in Typescript so if your library it's also using it you will be getting typings for free.

```
npm i -S passport-token-introspection
```