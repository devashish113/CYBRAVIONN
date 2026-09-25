#!/bin/bash
set -e
export DEBIAN_FRONTEND=noninteractive

echo "=== 1. Checking Host Nginx & Certbot ==="
if ! command -v certbot >/dev/null 2>&1; then
    echo "Installing certbot and python3-certbot-nginx on host..."
    apt-get update -qq
    apt-get install -y -qq certbot python3-certbot-nginx
fi

echo "=== 2. Requesting Let's Encrypt SSL Certificate ==="
certbot --nginx \
    -d cybravions.com \
    -d www.cybravions.com \
    --non-interactive \
    --agree-tos \
    --email support@cybravions.com \
    --redirect || {
        echo "Attempting fallback with --expand..."
        certbot --nginx -d cybravions.com -d www.cybravions.com --non-interactive --agree-tos --email support@cybravions.com --expand || true
    }

echo "=== 3. Testing and Reloading Nginx ==="
nginx -t
if command -v systemctl >/dev/null 2>&1; then
    systemctl reload nginx || systemctl restart nginx || true
elif command -v service >/dev/null 2>&1; then
    service nginx reload || service nginx restart || true
else
    nginx -s reload || true
fi

echo "=== SSL Setup Completed Successfully ==="
