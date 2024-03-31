resource "aws_iam_instance_profile" "ec2-iam-profile" {
name = "ec2_profile"
role = aws_iam_role.ec2-iam-role.name
}