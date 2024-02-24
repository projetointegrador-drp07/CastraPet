FROM alpine:3.19.1

WORKDIR /app

RUN apt-install make build-essential libssl-dev zlib1g-dev \
    libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm \
    libncursesw5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev \
    libffi-dev liblzma-dev

RUN /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

RUN brew update \
    brew install pyenv openssl readline sqlite3 xz zlib tcl-tk

RUN pyenv install 3.9.18 \
    pyenv global 3.9.18

RUN pip3 install -r requirements.txt

COPY . .

RUN python3 manage.py migrate \
    python3 manage.py runserver