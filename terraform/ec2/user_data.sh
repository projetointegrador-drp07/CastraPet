#!/bin/bash
sudo mkdir /tmp/ssm
cd /tmp/ssm
wget https://s3.amazonaws.com/ec2-downloads-windows/SSMAgent/latest/debian_amd64/amazon-ssm-agent.deb
sudo dpkg -i amazon-ssm-agent.deb
sudo systemctl enable amazon-ssm-agent
rm amazon-ssm-agent.deb

sudo apt install -y curl unzip
curl -o terraform.zip https://releases.hashicorp.com/terraform/1.4.0/terraform_1.4.0_linux_amd64.zip
unzip terraform.zip
sudo mv terraform /usr/local/bin/