import type { Session, SessionOptions } from 'express-session'
import session from 'express-session'
import type { EventHandler } from 'h3'

export function SessionHandler(options: SessionOptions): EventHandler<void> {
  return session(options) as any
}

export type {
  SessionOptions,
  Session,
}
