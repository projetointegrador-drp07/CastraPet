resource "aws_iam_role" "github_actions_role" {
    name               = "GitHubActionsRole"
    description        = "Role for GitHub Actions workflows"
    assume_role_policy = <<EOF
        {
            "Version": "2012-10-17",
            "Statement": {
                "Effect": "Allow",
                "Principal": {
                    "Service": [
                        "ec2.amazonaws.com",
                        "s3.amazonaws.com",
                        "iam.amazonaws.com"
                    ]
                },
                "Action": "sts:AssumeRoleWithWebIdentity",
                "Condition": {
                    "StringEquals": {
                        "sts:WebIdentityTokenIssuer": "arn:aws:iam::914256152987:oidc-provider/token.actions.githubusercontent.com"
                    }
                }
            }
        }
    EOF
}

resource "aws_iam_role" "ec2-iam-role" {
    name        = "ec2-ssm-role"
    description = "Role for SSM access to EC2 instance"
    assume_role_policy = <<EOF
        {
            "Version": "2012-10-17",
            "Statement": {
                "Effect": "Allow",
                "Principal": {
                    "Service": "ec2.amazonaws.com"
                },
                "Action": "sts:AssumeRole"
            }
        }
    EOF
}