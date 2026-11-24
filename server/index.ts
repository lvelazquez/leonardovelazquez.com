import 'dotenv/config'
import path from 'node:path'
import express from 'express'
import compression from 'compression'
import nodemailer from 'nodemailer'
import { buildMail, toAddress } from './contact.ts'

const GMAIL_USER = process.env.GMAIL_USER ?? ''
const GMAIL_PASS = process.env.GMAIL_PASS ?? ''
const port = Number(process.env.PORT ?? 3001)
const dist = path.resolve(import.meta.dirname, '../dist')

const app = express()
app.use(compression())
app.use(express.json({ limit: '10kb' }))
app.use(express.static(dist))

app.post('/api/contact', async (req, res) => {
  if (!GMAIL_USER || !GMAIL_PASS) {
    res.status(503).json({ ok: false, error: 'mail is not configured' })
    return
  }
  const result = buildMail(req.body, toAddress(GMAIL_USER))
  if (!result.ok) {
    res.status(400).json({ ok: false, error: result.error })
    return
  }
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user: toAddress(GMAIL_USER), pass: GMAIL_PASS },
  })
  try {
    await transport.sendMail(result.mail)
    res.json({ ok: true })
  } catch (error) {
    console.error('contact: send failed', error instanceof Error ? error.message : error)
    res.status(500).json({ ok: false, error: 'send failed' })
  }
})

// Single-page app: any other GET serves the built index so deep links like /work/wgl load.
app.get('/{*splat}', (_req, res) => {
  res.sendFile(path.join(dist, 'index.html'))
})

app.listen(port, () => console.log(`Server listening on port ${port}`))
