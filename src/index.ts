import type { Session, SessionData, SessionOptions } from 'express-session'
import session from 'express-session'
import type { CompatibilityEventHandler, IncomingMessage } from 'h3'
import { defineEventHandler, defineHandler } from 'h3'

export function SessionHandler(options: SessionOptions): CompatibilityEventHandler[] {
  return [
    defineHandler((req, res) => {
      // @ts-expect-error: Internal
      res._implicitHeader = () => {
        res.writeHead(res.statusCode)
      }
    }),
    session(options) as any,
    defineEventHandler((event) => {
      // @ts-expect-error: Internal
      event.context.session = event.req.session
      // @ts-expect-error: Internal
      event.context.sessionId = event.req.sessionId
    }),
  ]
}

export type {
  SessionOptions,
  Session,
  SessionData,
}

declare module 'h3' {
  interface EventContext {
    session: Session & Partial<SessionData>
    sessionId: string
  }
}
