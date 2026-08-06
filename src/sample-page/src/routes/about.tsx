import { createFileRoute } from '@tanstack/react-router'
import { API_URL } from '#/env'
import type { AppType } from '#/sample-worker/mytype'
import { hc } from 'hono/client'

const client = API_URL.map(url => hc<AppType>(url))

export const Route = createFileRoute('/about')({
  component: About,
})

function fetchData() {
  console.log('Fetching data from server function...')
  client.map(async c => {
    console.log((await c.greet.$get()).text());
  })
}

function About() {
  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <button onClick={()=>fetchData()} className="mb-4 rounded bg-blue-500 px-4 py-2 text-white">
          Click me
        </button>
        <p className="island-kicker mb-2">About</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          A small starter with room to grow.
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          TanStack Start gives you type-safe routing, server functions, and
          modern SSR defaults. Use this as a clean foundation, then layer in
          your own routes, styling, and add-ons.
        </p>
      </section>
    </main>
  )
}
