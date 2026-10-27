
pipeline {
    agent {
        label 'windows-cypress-agent'
    }

    options {
        timeout(time: 20, unit: 'MINUTES')
        timestamps()
    }

    stages {
        stage('Check Environment') {
            steps {
                bat 'node --version'
                bat 'npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browser') {
            steps {
                bat 'npx playwright install chromium'
            }
        }

        stage('Run E2E Tests') {
            steps {
                bat 'npx playwright test --workers=1'
            }
        }
    }

    post {
        always {
            archiveArtifacts(
                artifacts: 'playwright-report/**,test-results/**',
                allowEmptyArchive: true
            )
        }

        success {
            echo 'Playwright E2E tests passed!'
        }

        failure {
            echo 'Playwright E2E tests failed. Review the console output.'
        }
    }
}
