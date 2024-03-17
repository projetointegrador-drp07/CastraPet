#!/bin/bash

cp -R . /etc/nginx
chmod -R 0644 /etc/nginx

cp sites-available/castrpet.conf /etc/nginx/sites-available/castrpet.conf
mkdir -p /etc/nginx/sites-enabled
ln -s /etc/nginx/sites-available/castrpet.conf /etc/nginx/sites-enabled/

openssl dhparam -out /etc/nginx/dhparam.pem 2048
mkdir -p /var/www/_letsencrypt
chown nginx /var/www/_letsencrypt

sed -i -r 's/(listen .*443)/\1; #/g; s/(ssl_(certificate|certificate_key|trusted_certificate) )/#;#\1/g; s/(server \{)/\1\n    ssl off;/g' /etc/nginx/sites-available/castrpet.conf

certbot certonly --webroot -d castrpet.com --email info@castrpet.com -w /var/www/_letsencrypt -n --agree-tos --force-renewal

sed -i -r -z 's/#?; ?#//g; s/(server \{)\n    ssl off;/\1/g' /etc/nginx/sites-available/castrpet.conf

echo -e '#!/bin/bash\nnginx -t && systemctl reload nginx' > /etc/letsencrypt/renewal-hooks/post/nginx-reload.sh
chmod a+x /etc/letsencrypt/renewal-hooks/post/nginx-reload.sh

nginx -t && systemctl reload nginx
nginx -g "daemon off;"
