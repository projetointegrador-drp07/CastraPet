variable aws_region {
    type = string
    default = "us-east-1"
}


variable default_tags {
  type = map(string)
  default = {
    repo         = "CastrPet"
    organization = "projetointegrador-drp07"
    created_by   = "terraform"
  }
}