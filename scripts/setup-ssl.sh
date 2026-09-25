#!/bin/bash
set -e
export DEBIAN_FRONTEND=noninteractive

echo "=== 1. Preparing ACME Challenge Directory ==="
mkdir -p /var/www/html/.well-known/acme-challenge
echo "acme-test-ok" > /var/www/html/.well-known/acme-challenge/test.txt
chmod -R 755 /var/www/html

echo "=== 2. Updating Host Nginx Config for ACME Validation ==="
cat << 'EOF' > /etc/nginx/sites-available/cybravion.conf
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name cybravions.com www.cybravions.com cybravions.online www.cybravions.online _;

    location ^~ /.well-known/acme-challenge/ {
        root /var/www/html;
        default_type "text/plain";
        try_files $uri =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
EOF

ln -sf /etc/nginx/sites-available/cybravion.conf /etc/nginx/sites-enabled/cybravion.conf
rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true

echo "=== Testing & Reloading Nginx ==="
nginx -t
pkill -HUP -f "nginx: master" || nginx -s reload || systemctl reload nginx || service nginx reload || true
sleep 2

# Test local ACME endpoint
echo "Local ACME test response:"
curl -s http://127.0.0.1/.well-known/acme-challenge/test.txt || true

echo "=== 3. Obtaining SSL Certificate via Webroot ==="
certbot certonly --webroot -w /var/www/html \
    -d cybravions.com \
    -d www.cybravions.com \
    --non-interactive \
    --agree-tos \
    --email support@cybravions.com || true

if [ -d /etc/letsencrypt/live/cybravions.com ]; then
    echo "=== 4. SSL Certificate Obtained! Configuring Nginx for Full HTTPS ==="
    cat << 'EOF' > /etc/nginx/sites-available/cybravion.conf
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name cybravions.com www.cybravions.com cybravions.online www.cybravions.online _;

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
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
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
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), interest-cohort=()" always;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 90;
    }
}
EOF
    ln -sf /etc/nginx/sites-available/cybravion.conf /etc/nginx/sites-enabled/cybravion.conf
    nginx -t
    pkill -HUP -f "nginx: master" || nginx -s reload || systemctl reload nginx || service nginx reload || true
    echo "🎉 HTTPS SSL is now FULLY ACTIVE on cybravions.com!"
else
    echo "❌ Certificate issuance pending."
fi
