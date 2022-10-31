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
import { createSessionHandler } from 'h3-session'

const app = createApp()

app.use(createSessionHandler({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
```

## Usage with Nuxt 3

```ts
// ~/server/middleware/session.ts
import { createSessionHandler } from 'h3-session'

export default createSessionHandler({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
})
```

```ts
// ~/server/api/hello.ts
export default defineEventHandler((event) => {
  // Get the session ID:
  console.log(event.context.session.id)

  // Assign some value to session:
  event.context.session.someKey = 'some value'
})
```

## Promisified session methods

```ts
export default defineEventHandler((event) => {
  await event.context.session.regeneratePromisified()
  // will have a new session here

  await event.context.session.reloadPromisified()
  // session updated

  await event.context.session.savePromisified()
  // session saved

  await event.context.session.destroyPromisified()
  // cannot access session here
})
```

Visit the [express-session docs](https://github.com/expressjs/session#sessionoptions) to see the complete session configuration.

## License

MIT
