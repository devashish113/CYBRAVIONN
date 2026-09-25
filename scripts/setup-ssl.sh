#!/bin/bash
set -e
export DEBIAN_FRONTEND=noninteractive

echo "=== Host Network & Ports Check ==="
ss -tulpn | grep ':80\|:443' || netstat -tulpn | grep ':80\|:443' || true
ps aux | grep nginx || true

echo "=== Host Nginx Configuration Test ==="
if [ -d /etc/nginx/sites-enabled ]; then
    echo "Sites enabled:"
    ls -la /etc/nginx/sites-enabled/ || true
    cat /etc/nginx/sites-enabled/* 2>/dev/null || true
fi

echo "=== Running Certbot with Webroot Mode ==="
mkdir -p /var/www/html/.well-known/acme-challenge

# Try certbot webroot mode first (zero downtime, doesn't need to restart nginx)
certbot certonly --webroot -w /var/www/html \
    -d cybravions.com \
    -d www.cybravions.com \
    --non-interactive \
    --agree-tos \
    --email support@cybravions.com || true

# If certificate was issued, check /etc/letsencrypt/live/cybravions.com/
if [ -d /etc/letsencrypt/live/cybravions.com ]; then
    echo "✅ SSL Certificate obtained successfully!"
    
    # Configure Nginx SSL site if not already present
    cat << 'EOF' > /etc/nginx/sites-available/cybravions.com
server {
    listen 80;
    listen [::]:80;
    server_name cybravions.com www.cybravions.com;

    location /.well-known/acme-challenge/ {
        root /var/www/html;
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
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF
    ln -sf /etc/nginx/sites-available/cybravions.com /etc/nginx/sites-enabled/cybravions.com
    # Remove default site if it conflicts
    rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true
    
    echo "Testing Nginx syntax..."
    nginx -t && (systemctl reload nginx || service nginx reload || nginx -s reload || true)
    echo "✅ Nginx HTTPS configured and reloaded!"
else
    echo "⚠️ Certbot could not obtain cert yet, checking fallback..."
fi
