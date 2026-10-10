#!/bin/bash
set -e
export DEBIAN_FRONTEND=noninteractive

echo "=== 1. Preparing ACME Challenge Directory ==="
mkdir -p /var/www/html/.well-known/acme-challenge
echo "acme-test-ok" > /var/www/html/.well-known/acme-challenge/test.txt
chmod -R 755 /var/www/html

echo "=== 2. Obtaining SSL Certificate via Webroot ==="
certbot certonly --webroot -w /var/www/html \
    -d cybravions.com \
    -d www.cybravions.com \
    --non-interactive \
    --agree-tos \
    --email support@cybravions.com || true

echo "=== 3. Writing Unified Cybravions Ecosystem Nginx Config ==="
cat << 'EOF' > /etc/nginx/sites-available/cybravion.conf
# ==============================================================================
# Cybravions Ecosystem - Unified Nginx Reverse Proxy Configuration
# ==============================================================================

server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    location ^~ /.well-known/acme-challenge/ {
        root /var/www/html;
        default_type "text/plain";
        try_files $uri =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name cybravions.com www.cybravions.com;

    ssl_certificate /etc/letsencrypt/live/cybravions.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/cybravions.com/privkey.pem;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 90s;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name threatforge.cybravions.com threaforge.cybravions.com threat-forge.cybravions.com;

    ssl_certificate /etc/letsencrypt/live/cybravions.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/cybravions.com/privkey.pem;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Cache-Control "no-cache, no-store, must-revalidate" always;
    add_header CDN-Cache-Control "no-store" always;
    add_header Cloudflare-CDN-Cache-Control "no-store" always;

    client_max_body_size 50M;

    location / {
        proxy_pass http://127.0.0.1:4173;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 180s;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name soc.cybravions.com soc-ai.cybravions.com socai.cybravions.com;

    ssl_certificate /etc/letsencrypt/live/cybravions.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/cybravions.com/privkey.pem;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Cache-Control "no-cache, no-store, must-revalidate" always;
    add_header CDN-Cache-Control "no-store" always;
    add_header Cloudflare-CDN-Cache-Control "no-store" always;

    client_max_body_size 50M;

    location / {
        proxy_pass http://127.0.0.1:3004;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 180s;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name exceptions.cybravions.com grc.cybravions.com exceptionmanager.cybravions.com;

    ssl_certificate /etc/letsencrypt/live/cybravions.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/cybravions.com/privkey.pem;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Cache-Control "no-cache, no-store, must-revalidate" always;
    add_header CDN-Cache-Control "no-store" always;
    add_header Cloudflare-CDN-Cache-Control "no-store" always;

    client_max_body_size 100M;

    location / {
        proxy_pass http://127.0.0.1:8501;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 86400s;
        proxy_send_timeout 86400s;
        proxy_buffering off;
    }

    location ^~ /_stcore/stream {
        proxy_pass http://127.0.0.1:8501/_stcore/stream;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 86400s;
        proxy_send_timeout 86400s;
        proxy_buffering off;
    }

    location ^~ /stream {
        proxy_pass http://127.0.0.1:8501/stream;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 86400s;
        proxy_send_timeout 86400s;
        proxy_buffering off;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name intel.cybravions.com misp.cybravions.com threatintel.cybravions.com;

    ssl_certificate /etc/letsencrypt/live/cybravions.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/cybravions.com/privkey.pem;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Cache-Control "no-cache, no-store, must-revalidate" always;
    add_header CDN-Cache-Control "no-store" always;
    add_header Cloudflare-CDN-Cache-Control "no-store" always;

    client_max_body_size 50M;

    location / {
        proxy_pass http://127.0.0.1:3002;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 180s;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name cyberrange.cybravions.com cyberquest.cybravions.com cyberverse.cybravions.com;

    ssl_certificate /etc/letsencrypt/live/cybravions.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/cybravions.com/privkey.pem;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Cache-Control "no-cache, no-store, must-revalidate" always;
    add_header CDN-Cache-Control "no-store" always;
    add_header Cloudflare-CDN-Cache-Control "no-store" always;

    client_max_body_size 50M;

    location / {
        proxy_pass http://127.0.0.1:3003;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 180s;
    }
}
EOF

ln -sf /etc/nginx/sites-available/cybravion.conf /etc/nginx/sites-enabled/cybravion.conf
rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true

nginx -t
pkill -HUP -f "nginx: master" || nginx -s reload || systemctl reload nginx || service nginx reload || true
echo "🎉 Cybravions Ecosystem Multi-Domain HTTPS is now FULLY ACTIVE!"
