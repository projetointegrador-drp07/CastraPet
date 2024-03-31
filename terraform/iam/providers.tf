provider "aws" {
  region = "us-east-1"
}

terraform {
  backend "s3" {
    bucket         = "castrapet-terraform"
    key            = "iam/terraform.tfstate"
    region         = "us-east-1"
  }
}