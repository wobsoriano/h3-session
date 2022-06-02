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
      // @ts-expect-error: Internal
      req.session.regenerate = () => new Promise((resolve, reject) => {
        (req as any).session.regenerate((err: Error) => {
          if (err)
            return reject(err)

          resolve(true)
        })
      })

      // @ts-expect-error: Internal
      req.session.destroy = () => new Promise((resolve, reject) => {
        (req as any).session.destroy((err: Error) => {
          if (err)
            return reject(err)

          resolve(true)
        })
      })

      // @ts-expect-error: Internal
      req.session.reload = () => new Promise((resolve, reject) => {
        (req as any).session.reload((err: Error) => {
          if (err)
            return reject(err)

          resolve(true)
        })
      })

      // @ts-expect-error: Internal
      req.session.save = () => new Promise((resolve, reject) => {
        (req as any).session.save((err: Error) => {
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
