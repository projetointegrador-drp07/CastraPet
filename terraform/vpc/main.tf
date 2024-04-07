resource "aws_vpc" "castrapet-vpc" {
  cidr_block = "10.42.0.0/16"
  instance_tenancy = "default"

  tags = {
    Name         = "castrapet-vpc"
    Organization = "projetointegrador-drp07"
  }
}

resource "aws_subnet" "castrapet-public-1" {
  vpc_id     = aws_vpc.castrapet-vpc.id
  cidr_block = "10.42.10.0/24"

  tags = {
    Name = "castrapet-public-1"
  }
}

resource "aws_internet_gateway" "castrapet-igw" {
  vpc_id = aws_vpc.castrapet-vpc.id

  tags = {
    Name         = "castrapet-igw"
    Organization = "projetointegrador-drp07"
  }
}

resource "aws_route_table" "castrapet-public-rt" {
  vpc_id = aws_vpc.castrapet-vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.castrapet-igw.id
  }

  tags = {
    Name         = "castrapet-public-rt"
    Organization = "projetointegrador-drp07"
  }
}

resource "aws_route_table_association" "castrapet-public-1-association" {
  subnet_id      = aws_subnet.castrapet-public-1.id
  route_table_id = aws_route_table.castrapet-public-rt.id
}

resource "aws_default_security_group" "castrapet-default-sg" {
  vpc_id = aws_vpc.castrapet-vpc.id

  ingress {
    protocol  = -1
    self      = true
    from_port = 0
    to_port   = 0
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_default_network_acl" "castrapet-default-nacl" {
  default_network_acl_id = aws_vpc.castrapet-vpc.default_network_acl_id

  ingress {
    protocol   = -1
    rule_no    = 100
    action     = "allow"
    cidr_block = "0.0.0.0/0"
    from_port  = 0
    to_port    = 0
  }

  egress {
    protocol   = -1
    rule_no    = 100
    action     = "allow"
    cidr_block = "0.0.0.0/0"
    from_port  = 0
    to_port    = 0
  }
}