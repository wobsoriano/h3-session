import { addServerHandler, addTemplate, createResolver, defineNuxtModule, useLogger } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'h3-session',
    configKey: 'session',
    compatibility: {
      nuxt: '^3.0.0-rc.12',
    },
  },
  setup(moduleOptions, nuxt) {
    const logger = useLogger('h3-session')

    const { resolve } = createResolver(import.meta.url)
    nuxt.options.runtimeConfig.session = {
      ...nuxt.options.runtimeConfig.session || {},
      ...moduleOptions,
    }

    addTemplate({
      filename: 'session-handler.mjs',
      write: true,
      getContents: () => `
        import { createSessionHandler } from 'h3-session'
        import { useRuntimeConfig } from '#imports'
        export default createSessionHandler(useRuntimeConfig().session)
      `,
    })

    addServerHandler({
      handler: resolve(nuxt.options.buildDir, 'session-handler.mjs'),
      middleware: true,
    })

    logger.success('h3-session middleware installed')
  },
})
