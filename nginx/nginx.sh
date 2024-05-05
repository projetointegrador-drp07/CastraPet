#!/bin/bash
export DEBIAN_FRONTEND=noninteractive

sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 'NGINX Full'

sudo apt update
sudo apt install nginx -y
sudo apt install certbot python3-certbot-nginx -y

sudo cp -R . /etc/nginx
sudo chmod -R 0644 /etc/nginx

sudo ln -s /etc/nginx/sites-available/castrapet.conf /etc/nginx/sites-enabled/

sudo certbot --nginx -d castrapet.online --noninteractive --agree-tos --force-renewal

sudo nginx -t && systemctl restart nginx
sudo systemctl enable --now nginx
nginx -g "daemon off;"