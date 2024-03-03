FROM python:3.9.18-alpine

RUN pip install --upgrade pip

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

ENTRYPOINT ["sh", "/entrypoint.sh"]