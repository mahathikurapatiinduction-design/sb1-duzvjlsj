import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

const app = express();
const port = process.env.PORT || 8787;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

const hasKey = Boolean(process.env.OPENAI_API_KEY);
const openai = hasKey ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

app.get('/api/health', (req, res) => {
  res.json({ ok: true, ai: hasKey ? 'enabled' : 'disabled' });
});

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body || {};
  const sanitized = Array.isArray(messages) ? messages : [];
  const fallback = () =>
    res.json({
      reply:
        'AI is currently unavailable. Please set OPENAI_API_KEY in your .env to enable the assistant.'
    });

  if (!openai) return fallback();

  try {
    const systemPrompt = {
      role: 'system',
      content:
        'You are Aqua, a friendly, proactive water conservation assistant for a personal dashboard. Be concise, actionable, and motivating. Provide quantifiable tips when possible. Always be safe and avoid making unverifiable claims.'
    };

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [systemPrompt, ...sanitized]
    });

    const reply = response.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';
    res.json({ reply });
  } catch (error) {
    console.error('OpenAI error', error);
    return fallback();
  }
});

app.listen(port, () => {
  console.log(`[server] listening on http://localhost:${port}`);
});