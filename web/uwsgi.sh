#!/bin/sh

sudo apt install python3-dev build-base pcre-dev

pip3 install uwsgi
pip3 install -r requirements.txt

python3 manage.py migrate --no-input
python3 manage.py collectstatic --no-input

uwsgi --ini /home/ubuntu/web/castrapet.uwsgi.ini