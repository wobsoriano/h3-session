import type { Session, SessionData, SessionOptions } from 'express-session'
import session from 'express-session'
import type { CompatibilityEventHandler, IncomingMessage, ServerResponse } from 'h3'
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

export interface H3EventContext extends Record<string, any> {}
export interface H3SessionData extends Record<string, any> {}

declare module 'h3' {
  interface CompatibilityEvent {
    '__is_event__': true
    event: CompatibilityEvent
    req: IncomingMessage & {
      session: Session & H3SessionData
      sessionId: string
    }
    res: ServerResponse & {
      _implicitHeader: () => void
    }
    context: H3EventContext
  }
}
