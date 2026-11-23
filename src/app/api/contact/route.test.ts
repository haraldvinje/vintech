import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { POST } from './route'

const send = vi.hoisted(() => vi.fn())

vi.mock('resend', () => ({
  Resend: class {
    emails = { send }
  }
}))

const valid = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  subject: 'Hello',
  message: 'A message'
}

function post(body: unknown) {
  return POST(
    new Request('http://localhost/api/contact', {
      method: 'POST',
      body: typeof body === 'string' ? body : JSON.stringify(body)
    })
  )
}

function sentEmail() {
  expect(send).toHaveBeenCalledOnce()
  return send.mock.calls[0][0]
}

beforeEach(() => {
  send.mockReset().mockResolvedValue({ error: null })
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe('POST /api/contact', () => {
  it('sends a valid submission to the contact inbox', async () => {
    const res = await post(valid)

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ success: true })
    expect(sentEmail()).toMatchObject({
      to: 'contact@vintech.no',
      replyTo: 'ada@example.com',
      subject: 'Contact Form: Hello'
    })
  })

  it('falls back to the sender name when there is no subject', async () => {
    await post({ ...valid, subject: '' })

    expect(sentEmail().subject).toBe('New message from Ada Lovelace')
  })

  it('rejects a body that is not JSON', async () => {
    const res = await post('not json')

    expect(res.status).toBe(400)
    expect(send).not.toHaveBeenCalled()
  })

  it.each([
    ['missing name', { name: '' }],
    ['whitespace-only name', { name: '   ' }],
    ['missing message', { message: '' }],
    ['non-string message', { message: 42 }],
    ['invalid email', { email: 'not-an-email' }],
    ['name over 200 chars', { name: 'a'.repeat(201) }],
    ['email over 254 chars', { email: `${'a'.repeat(250)}@x.no` }],
    ['subject over 200 chars', { subject: 'a'.repeat(201) }],
    ['message over 10000 chars', { message: 'a'.repeat(10001) }]
  ])('rejects %s', async (_, override) => {
    const res = await post({ ...valid, ...override })

    expect(res.status).toBe(400)
    expect(send).not.toHaveBeenCalled()
  })

  it('accepts fields exactly at their length limits', async () => {
    const res = await post({
      name: 'a'.repeat(200),
      email: `${'a'.repeat(248)}@x.no`,
      subject: 'a'.repeat(200),
      message: 'a'.repeat(10000)
    })

    expect(res.status).toBe(200)
  })

  it('escapes every user-supplied field in the email body', async () => {
    const payload = `<script>"x"&'y'</script>`
    await post({
      name: payload,
      email: `"<b>"@example.com`,
      subject: payload,
      message: payload
    })

    const { html } = sentEmail()
    expect(html).not.toContain('<script>')
    expect(html).not.toContain('<b>')
    expect(html).toContain('&lt;script&gt;&quot;x&quot;&amp;&#39;y&#39;&lt;/script&gt;')
  })

  it('returns 500 when Resend reports an error', async () => {
    send.mockResolvedValue({ error: { message: 'boom' } })

    const res = await post(valid)

    expect(res.status).toBe(500)
  })

  it('returns 500 when Resend throws', async () => {
    send.mockRejectedValue(new Error('network'))

    const res = await post(valid)

    expect(res.status).toBe(500)
  })

  it.each([
    ['2026-01-01T12:00:00Z', 'January 1st'],
    ['2026-01-02T12:00:00Z', 'January 2nd'],
    ['2026-01-03T12:00:00Z', 'January 3rd'],
    ['2026-01-04T12:00:00Z', 'January 4th'],
    ['2026-01-11T12:00:00Z', 'January 11th'],
    ['2026-01-12T12:00:00Z', 'January 12th'],
    ['2026-01-13T12:00:00Z', 'January 13th'],
    ['2026-01-21T12:00:00Z', 'January 21st'],
    ['2026-01-22T12:00:00Z', 'January 22nd'],
    ['2026-01-23T12:00:00Z', 'January 23rd'],
    ['2026-01-25T12:00:00Z', 'January 25th'],
    ['2026-01-31T12:00:00Z', 'January 31st']
  ])('dates %s as "%s"', async (iso, expected) => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date(iso))

    await post(valid)

    expect(sentEmail().html).toContain(`13:00, ${expected} 2026`)
  })

  it('uses the Oslo date, not the UTC date, around midnight', async () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date('2026-06-30T22:30:00Z'))

    await post(valid)

    expect(sentEmail().html).toContain('00:30, July 1st 2026')
  })
})
