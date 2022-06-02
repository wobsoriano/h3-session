# h3-session

[![Version](https://img.shields.io/npm/v/h3-session?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/h3-session)

Add session support in h3 using [express-session](https://github.com/expressjs/session).

## Installation

```bash
npm install h3-session
```

## Usage with h3

```ts
import { createApp } from 'h3'
import { SessionHandler } from 'h3-session'

const app = createApp()

app.use(SessionHandler({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
```

## Usage with Nuxt 3

```ts
// ~/server/middleware/session.ts
import { SessionHandler } from 'h3-session'

export default SessionHandler({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
})
```

```ts
// ~/server/api/hello.ts
export default defineEventHandler(({ req }) => {
  // Get the session ID:
  console.log(req.session.id)

  // Assign some value to session:
  req.session.someKey = 'some value'
})
```

Visit the [express-session docs](https://github.com/expressjs/session#sessionoptions) to see the complete session configuration.

## TypeScript

Typing the session property

```ts
// ~/server/middleware/session.ts
import type { IncomingMessage, ServerResponse } from 'h3'
import { SessionHandler } from 'h3-session'

export default SessionHandler({})

interface Session {
  session: { name: string }
  sessionId: string
}

declare module 'h3' {
  interface CompatibilityEvent {
    event: CompatibilityEvent
    req: IncomingMessage & Session
    res: ServerResponse
    context: Record<string, any>
  }
}
```

## License

MIT
