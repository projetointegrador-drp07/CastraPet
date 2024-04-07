resource "aws_instance" "ec2_castrapet" {
  ami                  = "ami-080e1f13689e07408"
  instance_type        = "t2.micro"  
  user_data            = data.template_file.startup.rendered
  iam_instance_profile = data.aws_iam_instance_profile.ec2-iam-profile.name
  subnet_id            = data.terraform_remote_state.vpc-remote-state.outputs.subnet_id

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

resource "aws_eip" "ip_ec2_castrapet" {
  instance = aws_instance.ec2_castrapet.id
}

