import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createTransport } from 'nodemailer';

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
}

const TO = 'info@eagami.com';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Zoho SMTP with an app-specific password; the authenticated mailbox must
  // also be the from address or Zoho rejects the send
  const user = process.env['ZOHO_SMTP_USER'];
  const pass = process.env['ZOHO_SMTP_PASS'];
  if (!user || !pass) {
    console.error('[contact] ZOHO_SMTP_USER / ZOHO_SMTP_PASS env vars are missing');
    res.status(500).json({ error: 'Mail service not configured' });
    return;
  }

  const { name, email, message } = (req.body ?? {}) as ContactPayload;
  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof message !== 'string' ||
    !name.trim() ||
    !email.trim() ||
    !message.trim()
  ) {
    res.status(400).json({ error: 'Missing or invalid fields' });
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: 'Invalid email address' });
    return;
  }

  const transport = createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  try {
    await transport.sendMail({
      from: `eagami.com <${user}>`,
      to: TO,
      replyTo: email,
      subject: `New eagami.com inquiry from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('[contact] SMTP send failed:', error);
    res.status(502).json({ error: 'Failed to send message' });
  }
}
