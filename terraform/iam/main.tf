
resource "aws_iam_openid_connect_provider" "github_actions" {
  url = "https://token.actions.githubusercontent.com"

  thumbprint_list = [
    "6938fd4d98bab03faadb97b34396831e3780aea1",
    "1c58a3a8518e8759bf075b76b750d4f2df264fcd"
  ]
}

resource "aws_iam_policy" "gh_actions_assume_role_policy" {
  name        = "GitHubActionsAssumeRolePolicy"
  description = "Policy to allow GitHub Actions to assume roles in AWS IAM"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect    = "Allow",
        Action    = "sts:AssumeRoleWithWebIdentity",
        Resource  = "*",
        Condition = {
          StringEquals = {
            "${aws_iam_openid_connect_provider.github_actions.url}:sub" = "arn:aws:sts::914256152987:oidc-provider/*"
          }
        }
      }
    ]
  })
}

resource "aws_iam_openid_connect_provider_policy_attachment" "github_actions_attach" {
  openid_connect_provider_id = aws_iam_openid_connect_provider.github_actions.id
  policy_arn                 = aws_iam_policy.gh_actions_assume_role_policy.arn
}

resource "aws_iam_role" "github_actions_role" {
  name               = "GitHubActionsRole"
  gh_actions_assume_role_policy = aws_iam_policy.gh_actions_assume_role_policy.json
}

resource "aws_iam_policy" "github_actions_policy" {
  name        = "GitHubActionsPolicy"
  description = "Policy to grant permissions to GitHub Actions"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect   = "Allow",
        Action   = "*",
        Resource = "*",
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "github_actions_policy_attach" {
  role       = aws_iam_role.github_actions_role.name
  policy_arn = aws_iam_policy.github_actions_policy.arn
}
