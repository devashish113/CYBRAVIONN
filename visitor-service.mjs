import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'visitors.json');
const PORT = parseInt(process.env.PORT || '5000', 10);

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In-memory state with persistence
let state = {
  totalVisitors: 1,
  createdAt: new Date().toISOString(),
  lastUpdated: new Date().toISOString(),
  visitors: {},
};

function loadState() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      if (typeof parsed.totalVisitors === 'number') {
        state = {
          ...state,
          ...parsed,
          visitors: parsed.visitors || {},
        };
      }
    } else {
      saveState();
    }
  } catch (err) {
    console.error('[Visitor API] Error loading state:', err);
  }
}

function saveState() {
  try {
    state.lastUpdated = new Date().toISOString();
    const tmpFile = `${DATA_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tmpFile, JSON.stringify(state, null, 2), 'utf8');
    fs.renameSync(tmpFile, DATA_FILE);
  } catch (err) {
    console.error('[Visitor API] Error saving state:', err);
  }
}

loadState();

function sendJson(res, statusCode, data) {
  const payload = JSON.stringify(data);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload),
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Visitor-Id',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
  });
  res.end(payload);
}

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Visitor-Id',
    });
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname.replace(/\/+$/, '');

  if (pathname === '/health' || pathname === '') {
    return sendJson(res, 200, { status: 'healthy', uptime: process.uptime() });
  }

  // GET /api/visitors or /api/visitors/
  if (req.method === 'GET' && (pathname === '/api/visitors' || pathname === '/visitors')) {
    return sendJson(res, 200, {
      success: true,
      totalVisitors: state.totalVisitors,
      lastUpdated: state.lastUpdated,
    });
  }

  // POST /api/visitors/hit or /api/visitors
  if (req.method === 'POST' && (pathname === '/api/visitors/hit' || pathname === '/api/visitors' || pathname === '/visitors/hit')) {
    let bodyStr = '';
    req.on('data', chunk => {
      bodyStr += chunk;
      if (bodyStr.length > 65536) {
        req.destroy();
      }
    });

    req.on('end', () => {
      let clientVisitorId = '';
      try {
        if (bodyStr.trim()) {
          const parsed = JSON.parse(bodyStr);
          clientVisitorId = parsed.visitorId || parsed.id || '';
        }
      } catch {}

      const clientIp = (req.headers['cf-connecting-ip'] || 
                        req.headers['x-forwarded-for'] || 
                        req.socket.remoteAddress || '').split(',')[0].trim();
      const userAgent = req.headers['user-agent'] || '';

      const visitorFingerprint = clientVisitorId 
        ? clientVisitorId 
        : crypto.createHash('sha256').update(`${clientIp}-${userAgent}`).digest('hex').substring(0, 24);

      const now = new Date().toISOString();
      const existing = state.visitors[visitorFingerprint];

      let isNew = false;
      if (!existing) {
        isNew = true;
        state.totalVisitors += 1;
        state.visitors[visitorFingerprint] = {
          firstSeen: now,
          lastSeen: now,
          hits: 1,
        };
        saveState();
      } else {
        existing.lastSeen = now;
        existing.hits = (existing.hits || 1) + 1;
        // Periodic save for existing hit tracking
        if (existing.hits % 5 === 0) {
          saveState();
        }
      }

      return sendJson(res, 200, {
        success: true,
        totalVisitors: state.totalVisitors,
        isNew,
      });
    });
    return;
  }

  sendJson(res, 404, { error: 'Not Found' });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[Visitor API] Server running on port ${PORT}. Total visitors: ${state.totalVisitors}`);
});
