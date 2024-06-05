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
- Copy the "Public IPv4 DNS" and save it in a secret called "EC2_HOST" in github. Create another secret name "EC2_User" and save "ec2-user" in it.
- Also copy the "Public IP address" of the EC2 instance and save it in a secret called EC2_PUBLIC_IP. It is used in the prometheus.yml and you will need to see the deployed app.

## CICD
- If you push the docker build image in your own docker hub account, you will have to save the username and password of the account in "DOCKER_USERNAME" and "DOCKER_PASSWORD" secrets in github.
- You can change the "hello Koraspond" message in index.js file to trigger the ci/cd pipeline.
  - First the build stage runs, which installs dependenices, performs tests, builds the dockerfile and runs vulnerability scanning on the docker image and then pushes it to the docker hub.
  - After that the deploy stage runs, it connects to an ec2 instance and fetches the docker container from the docker hub and runs the contanerized application.
- After the successful execution of the pipeline, you can find the output in "http://'ec2-public-ip':80" address.

# Monitoring
metrics.js file exposes the metrics of the app on metrics endpoint. To scrap these metrices do the following:
- Install prometheus locally using the following commands:
    - /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    - brew install prometheus
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
