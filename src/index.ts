import type { Session, SessionData, SessionOptions } from 'express-session'
import session from 'express-session'
import type { CompatibilityEventHandler } from 'h3'
import { defineHandler } from 'h3'

export function SessionHandler(options: SessionOptions): CompatibilityEventHandler[] {
  return [
    defineHandler((_req, res) => {
      // @ts-expect-error: Internal
      res._implicitHeader = () => {
        res.writeHead(res.statusCode)
      }
    }),
    session(options) as any,
  ]
}

export type {
  SessionOptions,
  Session,
  SessionData,
}
