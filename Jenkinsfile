pipeline {
    
    agent any

    options {
        timestamps()
        timeout(time: 15, unit: 'MINUTES')
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Playwright') {
            agent {
                docker {
                    // Keep this tag in sync with the @playwright/test version in package.json
                    image 'mcr.microsoft.com/playwright:v1.64.1-noble'
                    args '--ipc=host'
                    reuseNode true
                }
            }

            environment {
                // Jenkins runs the container as the Jenkins user, which has no writable home
                HOME = "${WORKSPACE}"
                npm_config_cache = "${WORKSPACE}/.npm"
            }

            stages {
                stage('Install Dependencies') {
                    steps {
                        sh '''
                            node --version
                            npm --version
                            npm ci
                            # Run after npm ci so this reports the project's Playwright, not a fresh npx download
                            npx playwright --version
                        '''
                    }
                }

                stage('Run Playwright Tests') {
                    steps {
                        sh 'npx playwright test'
                    }
                }
            }
        }
    }

    post {
        always {
            junit allowEmptyResults: true, testResults: 'test-results/junit.xml'
            archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true
        }

        success {
            echo 'SUCCESS: All Playwright tests passed!'
        }

        failure {
            echo 'FAILED: Check the stage logs for the error.'
        }
    }
}
