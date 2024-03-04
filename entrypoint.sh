#!/bin/sh
sudo ufw allow 80
sudo ufw allow 8000

python3 manage.py migrate --no-input
python3 manage.py collectstatic --no-input

DJANGO_SUPERUSER_PASSWORD=$ADMIN_SECRET_KEY python3 manage.py createsuperuser --username=$ADMIN_USERNAME --email=$ADMIN_EMAIL --noinput

cd /CastrPet
gunicorn --bind 0.0.0.0:8000 CastrPet.wsgi