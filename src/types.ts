// Extracted from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/express-session/index.d.ts

export interface Session {
  /**
   * Each session has a unique ID associated with it.
   * This property is an alias of `req.sessionID` and cannot be modified.
   * It has been added to make the session ID accessible from the session object.
   */
  id: string

  /**
   * Each session has a unique cookie object accompany it.
   * This allows you to alter the session cookie per visitor.
   * For example we can set `req.session.cookie.expires` to `false` to enable the cookie to remain for only the duration of the user-agent.
   */
  cookie: Cookie

  /** To regenerate the session simply invoke the method. Once complete, a new SID and `Session` instance will be initialized at `req.session` and the `callback` will be invoked. */
  regenerate(): Promise<true>

  /** Destroys the session and will unset the `req.session` property. Once complete, the `callback` will be invoked. */
  destroy(): Promise<true>

  /** Reloads the session data from the store and re-populates the `req.session` object. Once complete, the `callback` will be invoked. */
  reload(): Promise<true>

  /**
   * Resets the cookie's `maxAge` to `originalMaxAge`
   * @see Cookie
   */
  resetMaxAge(): void

  /**
   * Save the session back to the store, replacing the contents on the store with the contents in memory
   *   (though a store may do something else - consult the store's documentation for exact behavior).
   *
   * This method is automatically called at the end of the HTTP response if the session data has been altered
   *   (though this behavior can be altered with various options in the middleware constructor).
   * Because of this, typically this method does not need to be called.
   * There are some cases where it is useful to call this method, for example: redirects, long-lived requests or in WebSockets.
   */
  save(): Promise<true>

  /** Updates the `maxAge` property. Typically this is not necessary to call, as the session middleware does this for you. */
  touch(): void
}

export interface CookieOptions {
  /**
   * Specifies the number (in milliseconds) to use when calculating the `Expires Set-Cookie` attribute.
   * This is done by taking the current server time and adding `maxAge` milliseconds to the value to calculate an `Expires` datetime. By default, no maximum age is set.
   *
   * If both `expires` and `maxAge` are set in the options, then the last one defined in the object is what is used.
   * `maxAge` should be preferred over `expires`.
   *
   * @see expires
   */
  maxAge?: number | undefined

  signed?: boolean | undefined

  /**
   * Specifies the `Date` object to be the value for the `Expires Set-Cookie` attribute.
   * By default, no expiration is set, and most clients will consider this a "non-persistent cookie" and will delete it on a condition like exiting a web browser application.
   *
   * If both `expires` and `maxAge` are set in the options, then the last one defined in the object is what is used.
   *
   * @deprecated The `expires` option should not be set directly; instead only use the `maxAge` option
   * @see maxAge
   */
  expires?: Date | undefined

  /**
   * Specifies the boolean value for the `HttpOnly Set-Cookie` attribute. When truthy, the `HttpOnly` attribute is set, otherwise it is not.
   * By default, the `HttpOnly` attribute is set.
   *
   * Be careful when setting this to `true`, as compliant clients will not allow client-side JavaScript to see the cookie in `document.cookie`.
   */
  httpOnly?: boolean | undefined

  /**
   * Specifies the value for the `Path Set-Cookie` attribute.
   * By default, this is set to '/', which is the root path of the domain.
   */
  path?: string | undefined

  /**
   * Specifies the value for the `Domain Set-Cookie` attribute.
   * By default, no domain is set, and most clients will consider the cookie to apply to only the current domain.
   */
  domain?: string | undefined

  /**
   * Specifies the boolean value for the `Secure Set-Cookie` attribute. When truthy, the `Secure` attribute is set, otherwise it is not. By default, the `Secure` attribute is not set.
   * Be careful when setting this to true, as compliant clients will not send the cookie back to the server in the future if the browser does not have an HTTPS connection.
   *
   * Please note that `secure: true` is a **recommended option**.
   * However, it requires an https-enabled website, i.e., HTTPS is necessary for secure cookies.
   * If `secure` is set, and you access your site over HTTP, **the cookie will not be set**.
   *
   * The cookie.secure option can also be set to the special value `auto` to have this setting automatically match the determined security of the connection.
   * Be careful when using this setting if the site is available both as HTTP and HTTPS, as once the cookie is set on HTTPS, it will no longer be visible over HTTP.
   * This is useful when the Express "trust proxy" setting is properly setup to simplify development vs production configuration.
   *
   * If you have your node.js behind a proxy and are using `secure: true`, you need to set "trust proxy" in express. Please see the [README](https://github.com/expressjs/session) for details.
   *
   * Please see the [README](https://github.com/expressjs/session) for an example of using secure cookies in production, but allowing for testing in development based on NODE_ENV.
   */
  secure?: boolean | 'auto' | undefined

  encode?: ((val: string) => string) | undefined

  /**
   * Specifies the boolean or string to be the value for the `SameSite Set-Cookie` attribute.
   * - `true` will set the `SameSite` attribute to `Strict` for strict same site enforcement.
   * - `false` will not set the `SameSite` attribute.
   * - `lax` will set the `SameSite` attribute to `Lax` for lax same site enforcement.
   * - `none` will set the `SameSite` attribute to `None` for an explicit cross-site cookie.
   * - `strict` will set the `SameSite` attribute to `Strict` for strict same site enforcement.
   *
   * More information about the different enforcement levels can be found in the specification.
   *
   * **Note:** This is an attribute that has not yet been fully standardized, and may change in the future.
   * This also means many clients may ignore this attribute until they understand it.
   */
  sameSite?: boolean | 'lax' | 'strict' | 'none' | undefined
}

export interface Cookie extends CookieOptions {
  /** Returns the original `maxAge` (time-to-live), in milliseconds, of the session cookie. */
  originalMaxAge: number

  maxAge?: number | undefined
  signed?: boolean | undefined
  expires?: Date | undefined
  httpOnly?: boolean | undefined
  path?: string | undefined
  domain?: string | undefined
  secure?: boolean | 'auto' | undefined
  sameSite?: boolean | 'lax' | 'strict' | 'none' | undefined
}
