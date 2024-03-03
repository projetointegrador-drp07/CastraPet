#!/bin/sh

python3 ./Infra/contrib/env_gen.py
python3 manage.py migrate --no-input
python3 manage.py collectstatic --no-input

SUPER_USER_NAME=config('ADMIN_USERNAME')
SUPER_USER_EMAIL=config('ADMIN_EMAIL')
SUPER_USER_PASSWORD=config('ADMIN_SECRET_KEY')

DJANGO_SUPERUSER_PASSWORD=$SUPER_USER_PASSWORD python3 manage.py createsuperuser --username $SUPER_USER_NAME --email $SUPER_USER_EMAIL --noinput

gunicorn CastrPet.wsgi:application --bind 0.0.0.0:8000