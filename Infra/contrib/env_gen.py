import random
import string

characters = string.ascii_letters + string.digits + string.punctuation
password = ''.join(random.choice(characters) for i in range(16))

CONFIG_STRING = """
DEBUG=True
ADMIN_EMAIL='projetointegrador3.drp07@gmail.com'
ADMIN_USERNAME='pi3drp07'
ADMIN_SECRET_KEY=%s
ALLOWED_HOSTS=127.0.0.1, localhost, 0.0.0.0
#DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/NAME
#DEFAULT_FROM_EMAIL=
#EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
#EMAIL_HOST=
#EMAIL_PORT=
#EMAIL_USE_TLS=
#EMAIL_HOST_USER=
#EMAIL_HOST_PASSWORD=
""".strip() % password

with open('.env', 'w') as configfile:
    configfile.write(CONFIG_STRING)