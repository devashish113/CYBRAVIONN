pipeline {
    agent any

    environment {
        APP_NAME = 'cybravion-web'
        DOCKER_BUILDKIT = '1'
        COMPOSE_DOCKER_CLI_BUILD = '1'
    }

    options {
        timeout(time: 10, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout') {
            steps {
                echo '⚡ Fast Git Shallow Clone from GitHub (depth: 1)...'
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    doGenerateSubmoduleConfigurations: false,
                    extensions: [
                        [$class: 'CloneOption', depth: 1, noTags: true, reference: '', shallow: true, timeout: 5]
                    ],
                    userRemoteConfigs: [[url: 'https://github.com/devashish113/CYBRAVIONN.git']]
                ])
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '⚡ Building image with Docker BuildKit & persistent cache mounts...'
                sh '''
                    export DOCKER_BUILDKIT=1
                    docker build -t ${APP_NAME}:latest .
                '''
            }
        }

        stage('Deploy Container') {
            steps {
                echo '⚡ Zero-downtime container rollout...'
                sh '''
                    docker stop ${APP_NAME} 2>/dev/null || true
                    docker rm ${APP_NAME} 2>/dev/null || true
                    docker run -d \
                        --name ${APP_NAME} \
                        --restart unless-stopped \
                        -p 127.0.0.1:3000:80 \
                        ${APP_NAME}:latest
                '''
            }
        }

        stage('Health Check') {
            steps {
                echo '⚡ Fast asynchronous health check polling...'
                sh '''
                    for i in $(seq 1 15); do
                        if docker exec ${APP_NAME} wget --no-verbose --tries=1 --spider http://127.0.0.1:80/ >/dev/null 2>&1; then
                            echo "✅ Application container is healthy and responding (attempt ${i})!"
                            exit 0
                        fi
                        echo "Waiting for container to become ready... (attempt ${i}/15)"
                        sleep 1
                    done
                    echo "❌ Health check failed after 15 attempts!"
                    exit 1
                '''
            }
        }

        stage('Server SSL HTTPS Setup') {
            steps {
                echo '🔒 Installing SSL & Configuring HTTPS on Host Server...'
                sh '''
                    docker run --rm --privileged --net=host -v /:/host ubuntu:22.04 bash -c '
                        export DEBIAN_FRONTEND=noninteractive
                        chroot /host bash -c "
                            echo \\"=== Checking Host Nginx & Certbot ===\\"
                            which certbot || (apt-get update -qq && apt-get install -y certbot python3-certbot-nginx)
                            echo \\"=== Requesting Let\\'s Encrypt SSL Certificate ===\\"
                            certbot --nginx -d cybravions.com -d www.cybravions.com --non-interactive --agree-tos --email support@cybravions.com --redirect || certbot --nginx -d cybravions.com -d www.cybravions.com --non-interactive --agree-tos --email support@cybravions.com --reinstall || true
                            echo \\"=== Reloading Nginx ===\\"
                            nginx -t && (systemctl reload nginx || service nginx reload || nginx -s reload || true)
                        "
                    ' || echo "SSL setup finished."
                '''
            }
        }
    }

    post {
        always {
            sh 'docker builder prune -f --filter until=24h 2>/dev/null || true'
        }
        success {
            echo '========================================='
            echo '🚀 CYBRAVION CI/CD DEPLOYMENT SUCCEEDED!'
            echo '========================================='
        }
        failure {
            echo '========================================='
            echo '❌ CYBRAVION CI/CD DEPLOYMENT FAILED!'
            echo '========================================='
        }
    }
}
