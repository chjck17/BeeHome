### Create template:

`aws ses create-template --cli-input-json file://./mail-templates/<file_name>`

### List template:

`aws ses list-templates`

### Get template detail:

`aws ses get-template --template-name <template_name>`

### Update template:

`aws ses update-template --cli-input-json file://./mail-templates/<file_name>`

### Delete template

`aws ses delete-template --template-name <template_name>`
