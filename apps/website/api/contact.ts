import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
}

const FROM = 'eagami.com <noreply@eagami.com>';
const TO = 'michal@eagami.com';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env['RESEND_API_KEY'];
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY env var is missing');
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

  const resend = new Resend(apiKey);

  try {
    const result = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `New eagami.com inquiry from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (result.error) {
      console.error('[contact] Resend returned an error:', result.error);
      res.status(502).json({ error: 'Failed to send message' });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('[contact] Resend threw:', error);
    res.status(502).json({ error: 'Failed to send message' });
  }
}
