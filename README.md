# Koraspond
## Set up
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
- You will also need a docker hub username and password to fill in `DOCKER_USERNAME` and `DOCKER_PASSWORD` secrets.
> **Note:** Without `DOCKER_USERNAME`, `DOCKER_PASSWORD`, `EC2_HOST`, `EC2_User` and `EC2_PASSWORD`, you will not be able to execute the CI?CD pipeline.
- Also copy the "Public IP address" of the EC2 instance and replace the target ip-address in the targets field of promethius.yml file and commit the changes, keep the port 80.
- This will trigger the CI/CD pipeline.

## CICD
Any change made in the repo will trigger the ci/cd pipeline.
  - The `cicd.yml` file in the `.github/workflows` directory is responsible for executing the whole pipeline.
  - First the build stage runs, which installs dependenices.
  - It also performs unit and lint tests. For lint test, it uses the `gruntfile.js` file which basically checks if the YAML files are valid or not. The unit tests checks whether the pipeline has a build stage or not. The unit test uses the files `cicdUtils.js` and `cicdUtils.test.js` files for test definitions.
  - It then performs vulnerability tests Node.js dependencies (basic security check), builds the dockerfile and runs vulnerability scanning on the docker image and then pushes it to the docker hub.
  - After that the deploy stage runs, it connects to an ec2 instance via ssh connection and fetches the docker container from the docker hub and runs the contanerized application.
- After the successful execution of the container, you can find the application in "http://'ec2-public-ip':80" address.
- Metrics of the app can be seen at "http://'ec2-public-ip':80/metrics"
- The metrics can be scrapped as well by using promethius, at "http://'ec2-public-ip':9090"

### Monitoring
`metrics.js` file which exposes the metrics of the app on metrics endpoint. To scrap these metrices we can do the following steps:
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
- Access the prometheus service at "http://`ec2-public-ip`:9090" and use the following commands to see graphs and tables(you can also execute any other commands as well.):
  ```
  http_requests_total{method="GET",status="200"}
  http_requests_total{method="GET",status="404"}
  ```
