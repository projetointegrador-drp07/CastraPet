#!/bin/bash
export DEBIAN_FRONTEND=noninteractive

sudo apt update
sudo apt install python3 python3-pip -y
sudo apt install python3-venv -y
pip3 install gunicorn -y

cd /home/ubuntu/web && \
    python3 -m venv venv && \
    source venv/bin/activate

pip install -r requirements.txt

python manage.py migrate
python manage.py collectstatic

sudo cp gunicorn.socket /etc/systemd/system/gunicorn.socket
sudo cp gunicorn.service /etc/systemd/system/gunicorn.service

sudo systemctl enable --now gunicorn.socket
sudo systemctl start gunicorn
sudo systemctl enable --now gunicorn
