resource "aws_instance" "ec2_castrapet" {
  ami           = "ami-080e1f13689e07408"
  instance_type = "t2.micro"
  subnet_id     = "subnet-0633d4ba290d268b9"
  user_data     = data.template_file.startup.rendered

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
