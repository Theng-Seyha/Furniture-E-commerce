import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Safe Firebase Admin Initialization
let db: any = null;
try {
  let firebaseConfig: any = {};
  const configPath = path.resolve(__dirname, 'firebase-applet-config.json');
  if (fs.existsSync(configPath)) {
    firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  }

  if (getApps().length === 0) {
    initializeApp({
      projectId: firebaseConfig.projectId || process.env.GCP_PROJECT || process.env.GOOGLE_CLOUD_PROJECT,
    });
  }

  if (firebaseConfig.firestoreDatabaseId) {
    db = getFirestore(firebaseConfig.firestoreDatabaseId);
  } else {
    db = getFirestore();
  }
} catch (e) {
  console.warn('Firebase Admin initialization notice:', e);
}

async function createServer() {
  const app = express();
  app.use(express.json()); // Essential for bot webhooks
  const port = Number(process.env.PORT) || 3000;

  // Health check endpoint for Cloud Run container health probes
  app.get(['/healthz', '/api/health', '/_health'], (_req: Request, res: Response) => {
    res.status(200).send('OK');
  });

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
        if (!db) {
          await sendBotMessage(chatId, "⚠️ Database service currently initializing. Please try again in a moment.");
          return res.sendStatus(200);
        }

        // Query by email without orderBy to avoid index requirement
        const snapshot = await db.collection('internship_applications')
          .where('email', '==', email)
          .get();

        if (snapshot.empty) {
          await sendBotMessage(chatId, `🔍 No application found for <b>${email}</b>. Please check the spelling or apply via the portal.`);
        } else {
          // Sort in memory to get the latest application
          const docs = snapshot.docs.sort((a: any, b: any) => {
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
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      // Production: Serve static files from dist
      app.use(express.static(distPath));
      
      // Fallback to index.html for SPA routing
      app.get('*', (_req, res) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    } else {
      console.warn('Production dist directory not found, serving root fallback.');
      app.get('*', (_req, res) => {
        res.sendFile(path.resolve(__dirname, 'index.html'));
      });
    }
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

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on 0.0.0.0:${port}`);
  });
}

createServer().catch((err) => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
