#!/bin/sh

apk add python3-dev build-base linux-headers pcre-dev

pip install uwsgi
pip install -r requirements.txt

python3 manage.py migrate --no-input
python3 manage.py collectstatic --no-input

uwsgi --ini /code/castrapet.uwsgi.ini