import type { SessionOptions } from 'express-session'
import session from 'express-session'
import { defineHandler } from 'h3'
import type { CompatibilityEventHandler } from 'h3'

export function SessionHandler(options: SessionOptions): CompatibilityEventHandler[] {
  return [
    defineHandler((_req, res) => {
      // @ts-expect-error: Internal
      res._implicitHeader = () => {
        res.writeHead(res.statusCode)
      }
    }),
    session(options) as any,
    defineHandler((req) => {
      // @ts-expect-error: Save old value
      req.session._regenerate = req.session.regenerate
      // @ts-expect-error: Internal
      req.session.regenerate = () => new Promise((resolve, reject) => {
        // @ts-expect-error: Call saved value
        req.session._regenerate((err: Error) => {
          if (err)
            return reject(err)

          resolve(true)
        })
      })

      // @ts-expect-error: Save old value
      req.session._destroy = req.session.destroy
      // @ts-expect-error: Internal
      req.session.destroy = () => new Promise((resolve, reject) => {
        // @ts-expect-error: Call saved value
        req.session._destroy((err: Error) => {
          if (err)
            return reject(err)

          resolve(true)
        })
      })

      // @ts-expect-error: Save old value
      req.session._reload = req.session.reload
      // @ts-expect-error: Internal
      req.session.reload = () => new Promise((resolve, reject) => {
        // @ts-expect-error: Call saved value
        req.session._reload((err: Error) => {
          if (err)
            return reject(err)

          resolve(true)
        })
      })

      // @ts-expect-error: Save old value
      req.session._save = req.session.save
      // @ts-expect-error: Internal
      req.session.save = () => new Promise((resolve, reject) => {
        // @ts-expect-error: Call saved value
        req.session._save((err: Error) => {
          if (err)
            return reject(err)

          resolve(true)
        })
      })
    }),
  ]
}

export * from './types'

export type {
  SessionOptions,
}
