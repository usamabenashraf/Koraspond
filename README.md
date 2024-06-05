# Koraspond
## EC2 instance
- Go to you AWS account search and select EC2 service
- Click the "Launch instance" button.
- Under the "Key-pair (login)" section, click the "Create new key pair" option.
- Give the key a name and click the "Create key pair" button.
- Copy the content of the generated file and save it in a secret in github named `EC2_PASSWORD`.
- Check mark "Allow HTTPS traffic from the internet" and "Allow HTTP traffic from the internet" options.
- Click the launch instance button.
- You will see a success message, click the id of the newly created instance to open it.
- Select the EC2 instance we created, a bunch of options will appear.
- Copy the "Public IPv4 DNS" and save it in a secret called `EC2_HOST` in github. Create another secret name `EC2_User` and save "ec2-user" in it.
- Click on the Security tab.
- Click on the security group associated with your instance.
- Edit inbound rules to allow all TCP traffic on all ports from anywhere-IPv4 (0.0.0.0/0).
- Click "Save rules" button.
- Also copy the "Public IP address" of the EC2 instance and replace the target ip-address in the target field of promethius.yml file and commit the changes, keep the port 80.

## CICD
- For pushing the docker build image in your own docker hub account, you will have to save the username and password of the account in "DOCKER_USERNAME" and "DOCKER_PASSWORD" secrets in github.
- You can make any change in the repo which will trigger the ci/cd pipeline.
  - First the build stage runs, which installs dependenices, performs vulnerability tests Node.js dependencies (basic security check), builds the dockerfile and runs vulnerability scanning on the docker image and then pushes it to the docker hub.
  - After that the deploy stage runs, it connects to an ec2 instance and fetches the docker container from the docker hub and runs the contanerized application.
- After the successful execution of the pipeline, you can find the output in "http://'ec2-public-ip':80" address.
- Metrics of the app can be seen at "http://'ec2-public-ip':80/metrics"
- The metrics can be scrapped as well by using promethius, at "http://'ec2-public-ip':9090"

### Monitoring
metrics.js file exposes the metrics of the app on metrics endpoint. To scrap these metrices do the following:
- Create the prometheus.yml file with the following content:
  ```
  scrape_configs:
    - job_name: 'blackbox'
      metrics_path: /metrics
      params:
        module: [http_2xx]  # specify the Blackbox module to use (e.g., http_2xx for HTTP 2xx responses)
      static_configs:
        - targets: ['<ec2-public-ip>:80']  # replace with the URL of the website you want to scrape
      scrape_interval: 15s  # scrape interval of 15 seconds
      scrape_timeout: 10s
   ```
- Start the prometheus service using the following command:
    prometheus --config.file=prometheus.yml
- Access the prometheus service at http://localhost:9090. and use the following commands to see graphs and tables:
  ```
  http_requests_total{method="GET",status="200"}
  http_requests_total{method="GET",status="404"}
  ```
