FROM python:3.9.0

USER root

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

ADD requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY gunicorn.socket /etc/systemd/system/gunicorn.socket
COPY gunicorn.service /etc/systemd/system/gunicorn.service

RUN apt-get update && apt-get install -y sudo ufw

ADD . .

EXPOSE 8000

ENTRYPOINT ["sh", "entrypoint.sh"]