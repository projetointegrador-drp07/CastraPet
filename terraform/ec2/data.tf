data "template_file" "startup" {
 template = file("user_data.sh")
}

data "aws_iam_instance_profile" "ec2-iam-profile" {
  name = "ec2_profile"
}

data "terraform_remote_state" "vpc-remote-state" {
  backend = "s3"
  config = {
    bucket         = "castrapet-terraform"
    key            = "vpc/terraform.tfstate"
    region         = "us-east-1"
  }
}
