output "vpc_id" {
  value = aws_vpc.castrapet-vpc.id
}

output "subnet_id" {
  value = aws_subnet.castrapet-public-1.id
}