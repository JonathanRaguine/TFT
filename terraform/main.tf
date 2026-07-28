terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-2"
}

resource "aws_eip" "tft_eip" {
  domain   = "vpc"

  tags = {
    Name = "tft-teambuilder-eip"
  }
}