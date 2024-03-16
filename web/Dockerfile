FROM python:3.8-alpine

RUN mkdir /code
WORKDIR /code
COPY . /code

RUN apk add python3-dev build-base linux-headers pcre-dev
RUN pip install uwsgi
RUN pip install -r requirements.txt

RUN python3 manage.py migrate --no-input
RUN python3 manage.py collectstatic --no-input

CMD ["uwsgi", "--ini", "/code/CastrPet.uwsgi.ini"]