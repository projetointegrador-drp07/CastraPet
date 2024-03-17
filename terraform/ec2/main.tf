resource "aws_instance" "ec2_castrpet" {
  ami           = "ami-080e1f13689e07408 "
  instance_type = "t2.micro"
  key_name      = "castrpet-key-pair" 
  user_data     = <<-EOF
                    #!/bin/bash
                    sudo apt install -y curl unzip
                    curl -o terraform.zip https://releases.hashicorp.com/terraform/1.4.0/terraform_1.4.0_linux_amd64.zip
                    unzip terraform.zip
                    sudo mv terraform /usr/local/bin/
                    terraform --version
                    EOF

  root_block_device {
    volume_size           = 8
    volume_type           = "gp2"
    delete_on_termination = false
  }

  ebs_block_device {
    device_name           = "/dev/sdf"
    volume_size           = 8
    volume_type           = "gp2"
    delete_on_termination = false
  }

    tags = var.default_tags
}
