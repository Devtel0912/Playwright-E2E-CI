
pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.56.1-noble'
            args '--ipc=host'
        }
    }

    options {
        timestamps()
        timeout(time: 15, unit: 'MINUTES')
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Check Environment') {
            steps {
                sh '''
                    echo "Checking Node.js"
                    node --version
                    npm --version
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: All Playwright tests passed!'
        }

        failure {
            echo 'FAILED: Check the stage logs for the error.'
        }
    }
}
