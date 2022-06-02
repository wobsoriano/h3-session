import type { Session, SessionOptions, SessionData } from 'express-session'
import session from 'express-session'
import type { EventHandler, IncomingMessage } from 'h3'

export function SessionHandler(options: SessionOptions): EventHandler<void> {
  return session(options) as any
}

export type {
  SessionOptions,
  Session,
  SessionData
}

declare module 'h3' {
  interface CompatibilityEvent {
    req: IncomingMessage & {
      session: Session & Partial<SessionData>
      sessionId: string
    }
  }
}
