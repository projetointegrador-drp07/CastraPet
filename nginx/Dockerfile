FROM nginx:latest

COPY . /etc/nginx
RUN chmod -R 0644 /etc/nginx

COPY sites-available/castrpet.conf /etc/nginx/sites-available/castrpet.conf

RUN mkdir /etc/nginx/sites-enabled
RUN ln -s /etc/nginx/sites-available/castrpet.conf /etc/nginx/sites-enabled/

RUN openssl dhparam -out /etc/nginx/dhparam.pem 2048 \
    && mkdir -p /var/www/_letsencrypt
    && chown nginx /var/www/_letsencrypt

RUN sed -i -r 's/(listen .*443)/\1; #/g; s/(ssl_(certificate|certificate_key|trusted_certificate) )/#;#\1/g; s/(server \{)/\1\n    ssl off;/g' /etc/nginx/sites-available/castrpet.conf && \
    sed -i -r -z 's/#?; ?#//g; s/(server \{)\n    ssl off;/\1/g' /etc/nginx/sites-available/castrpet.conf

RUN certbot certonly --webroot -d castrpet.com --email info@castrpet.com -w /var/www/_letsencrypt -n --agree-tos --force-renewal

RUN echo -e '#!/bin/bash\nnginx -t && systemctl reload nginx' | tee /etc/letsencrypt/renewal-hooks/post/nginx-reload.sh && \
    chmod a+x /etc/letsencrypt/renewal-hooks/post/nginx-reload.sh

RUN nginx -t && systemctl reload nginx

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]