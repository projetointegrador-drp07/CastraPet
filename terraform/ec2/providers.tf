provider "aws" {
  region = "us-east-1"
}

terraform {
  backend "s3" {
    bucket         = "castrapet-terraform"
    key            = "ec2/terraform.tfstate"
    region         = "us-east-1"
  }
}