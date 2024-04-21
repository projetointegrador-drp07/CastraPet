resource "aws_instance" "ec2_castrapet" {
  depends_on = [aws_security_group.ec2_security_group] 

  ami                  = "ami-080e1f13689e07408"
  instance_type        = "t2.micro"  
  user_data            = data.template_file.startup.rendered
  iam_instance_profile = data.aws_iam_instance_profile.ec2-iam-profile.name
  subnet_id            = data.terraform_remote_state.vpc-remote-state.outputs.subnet_id
  vpc_security_group_ids   = [aws_security_group.ec2_security_group.id]

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

resource "aws_security_group" "ec2_security_group" {
  name        = "ec2-security-group"
  description = "Security group for EC2 instance"

  vpc_id = data.terraform_remote_state.vpc-remote-state.outputs.vpc_id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}