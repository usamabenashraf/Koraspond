# Koraspond
## EC2 instance
- Go to you AWS account search and select EC2 service
- Click the "Launch instance" button.
- Under the "Key-pair (login)" section, click the "Create new key pair" option.
- Give the key a name and click the " Create key pair" button.
- Copy the content of the generated file and save it in a secret in github named "EC2_PASSWORD".
- Check mark "Allow HTTPS traffic from the internet" and "Allow HTTP traffic from the internet" options.
- Click the launch instance button.
- You will see a success message, click the id of the newly created instance to open it.
- Select the EC2 instance we created, a bunch of options will appear.
- Copy the "public IP address" and save it in a secret called "EC2_HOST" in github. Create another secret name "EC2_User" and save "ec2-user" in it.

## GitHub
- If you push the docker build image in your own docker hub account, you will have to save the username and password of the account in "DOCKER_USERNAME" and "DOCKER_PASSWORD" secrets in github.
- You can change the "hello Koraspond" message in index.js file to trigger the ci/cd pipeline.
- After the successful execution of the pipeline, you can find the output in "http://<ec2-public-ip>:80" address.
