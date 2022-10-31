import type { SessionOptions } from 'express-session'
import session from 'express-session'
import { eventHandler, fromNodeMiddleware } from 'h3'
import type { EventHandler, NodeMiddleware } from 'h3'
import type { Session } from './types'
declare module 'h3' {
  interface H3EventContext {
    session: Session
  }
}

export function createSessionHandler(options: SessionOptions): EventHandler[] {
  return [
    eventHandler((event) => {
      (event.res as any)._implicitHeader = () => {
        event.res.writeHead(event.res.statusCode)
      }
    }),
    fromNodeMiddleware(session(options) as NodeMiddleware),
    eventHandler((event) => {
      event.context.session = (event.req as any).session

      event.context.session.regeneratePromisified = () => new Promise((resolve, reject) => {
        // @ts-expect-error: Session missing types
        event.req.session.regenerate((err: Error) => {
          if (err)
            return reject(err)

          resolve(true)
        })
      })

      event.context.session.destroyPromisified = () => new Promise((resolve, reject) => {
        // @ts-expect-error: Session missing types
        event.req.session.destroy((err: Error) => {
          if (err)
            return reject(err)

          resolve(true)
        })
      })

      event.context.session.reloadPromisified = () => new Promise((resolve, reject) => {
        // @ts-expect-error: Session missing types
        event.req.session.reload((err: Error) => {
          if (err)
            return reject(err)

          resolve(true)
        })
      })

      event.context.session.savePromisified = () => new Promise((resolve, reject) => {
        // @ts-expect-error: Session missing types
        event.req.session.save((err: Error) => {
          if (err)
            return reject(err)

          resolve(true)
        })
      })
    }),
  ]
}

export type { Session }
