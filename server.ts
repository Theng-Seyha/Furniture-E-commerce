import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import admin from 'firebase-admin';
import { getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load Firebase Config safely
const firebaseConfig = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'firebase-applet-config.json'), 'utf-8')
);

// Initialize Firebase Admin (uses application default credentials)
try {
  if (getApps().length === 0) {
    initializeApp();
  }
} catch (e) {
  // Silent fail if already initialized
}

const db = getFirestore(firebaseConfig.firestoreDatabaseId);

async function createServer() {
  const app = express();
  app.use(express.json()); // Essential for bot webhooks
  const port = process.env.PORT || 3000;

  // 1. Telegram Bot Webhook Handler for /status command
  app.post('/api/telegram-webhook', async (req: Request, res: Response) => {
    const { message } = req.body;
    
    if (!message || !message.text) {
      return res.sendStatus(200);
    }

    const text = message.text.trim();
    const chatId = message.chat.id;

    // Command: /status [email]
    if (text.startsWith('/status')) {
      const parts = text.split(' ');
      if (parts.length < 2) {
        await sendBotMessage(chatId, "❌ Please provide your email: <code>/status your@email.com</code>");
        return res.sendStatus(200);
      }

      const email = parts[1].toLowerCase().trim();
      
      try {
        // Query by email without orderBy to avoid index requirement
        const snapshot = await db.collection('internship_applications')
          .where('email', '==', email)
          .get();

        if (snapshot.empty) {
          await sendBotMessage(chatId, `🔍 No application found for <b>${email}</b>. Please check the spelling or apply via the portal.`);
        } else {
          // Sort in memory to get the latest application
          const docs = snapshot.docs.sort((a, b) => {
            const timeA = a.data().createdAt?.toMillis() || 0;
            const timeB = b.data().createdAt?.toMillis() || 0;
            return timeB - timeA;
          });

          const appData = docs[0].data();
          const status = appData.status || 'Received';
          const ref = appData.ref || 'N/A';
          
          let statusIcon = '📥';
          if (status === 'Under Review') statusIcon = '🧐';
          if (status === 'Scheduled for Interview') statusIcon = '📅';
          if (status === 'Accepted') statusIcon = '🎉';
          if (status === 'Rejected') statusIcon = '📮';

          await sendBotMessage(chatId, `
📑 <b>Application Status Update</b>
━━━━━━━━━━━━━━━━━━━━━
<b>Ref:</b> <code>${ref}</code>
<b>Applicant:</b> ${appData.fullname}
<b>Email:</b> ${email}
━━━━━━━━━━━━━━━━━━━━━
<b>Current Status:</b> ${statusIcon} <b>${status}</b>
━━━━━━━━━━━━━━━━━━━━━
<i>Our team is processing applications as quickly as possible. Stay tuned!</i>
          `.trim());
        }
      } catch (err) {
        console.error('Bot status query error:', err);
        await sendBotMessage(chatId, "⚠️ Internal error querying status. Please try again later.");
      }
    }

    res.sendStatus(200);
  });

  // Helper to send messages back to Telegram
  async function sendBotMessage(chatId: number, text: string) {
    const BOT_TOKEN = '8888825923:AAEzB68kP5_F7KV74IN3nUVUnUIuVQFG05M';
    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: 'HTML'
        })
      });
    } catch (err) {
      console.error('Failed to send bot reply:', err);
    }
  }

  if (process.env.NODE_ENV === 'production') {
    // Production: Serve static files from dist
    app.use(express.static(path.resolve(__dirname, 'dist')));
    
    // Fallback to index.html for SPA routing
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  } else {
    // Development: Use Vite middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });

    app.use(vite.middlewares);

    app.get('*', async (req, res, next) => {
      const url = req.originalUrl;

      try {
        let template = fs.readFileSync(
          path.resolve(__dirname, 'index.html'),
          'utf-8'
        );

        template = await vite.transformIndexHtml(url, template);

        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  }

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

createServer();
