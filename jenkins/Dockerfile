# Jenkins controller with the Docker CLI, so pipelines can use `agent { docker { ... } }`.
# The Docker engine itself comes from the host via /var/run/docker.sock.
# Use the rolling JDK 21 build to receive upstream security fixes sooner.
FROM jenkins/jenkins:weekly-jdk21

USER root
RUN apt-get update \
    && apt-get upgrade -y --no-install-recommends \
    && apt-get install -y --no-install-recommends ca-certificates curl \
    && install -m 0755 -d /etc/apt/keyrings \
    && curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian $(. /etc/os-release && echo $VERSION_CODENAME) stable" \
       > /etc/apt/sources.list.d/docker.list \
    && apt-get update \
    && apt-get install -y --no-install-recommends docker-ce-cli \
    && rm -rf /var/lib/apt/lists/*
USER jenkins

RUN jenkins-plugin-cli --plugins docker-workflow junit timestamper
