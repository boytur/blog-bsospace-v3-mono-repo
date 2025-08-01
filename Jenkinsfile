pipeline {
    agent any

    environment {
        DISCORD_WEBHOOK = credentials('discord-webhook')
        BUILD_STATUS = 'UNKNOWN'
    }

    options {
        skipStagesAfterUnstable()
        timeout(time: 30, unit: 'MINUTES')
    }

    triggers {
        pollSCM('H/5 * * * *')
    }

    stages {
        stage('Checkout') {
            when {
                branch 'master'
            }
            steps {
                script {
                    echo "📥 Starting deployment pipeline for master branch..."
                    checkout scm
                }
            }
        }

        stage('Setup Credentials') {
            when {
                branch 'master'
            }
            steps {
                script {
                    echo "🔐 Setting up credentials..."

                    withCredentials([
                        file(credentialsId: 'blog-access-public-key-pem', variable: 'PUBLIC_KEY_FILE'),
                        file(credentialsId: 'blog-frontend-env', variable: 'FRONTEND_ENV_FILE'),
                        file(credentialsId: 'blog-backend-env', variable: 'BACKEND_ENV_FILE')
                    ]) {
                        sh '''
                            mkdir -p backend/keys frontend backend
                            cp "$PUBLIC_KEY_FILE" backend/keys/blogPublicAccess.pem
                            cp "$FRONTEND_ENV_FILE" frontend/.env
                            cp "$BACKEND_ENV_FILE" backend/.env
                        '''
                    }

                    echo "✅ Credentials setup completed"
                }
            }
        }

        stage('Validate Credentials') {
            when {
                branch 'master'
            }
            steps {
                script {
                    echo "✅ Validating credentials..."

                    if (env.DISCORD_WEBHOOK == null || env.DISCORD_WEBHOOK == '') {
                        error "DISCORD_WEBHOOK credential is not set"
                    }

                    def pemContent = readFile('backend/keys/blogPublicAccess.pem')
                    if (!pemContent?.trim()) {
                        error "PEM key file is empty or invalid"
                    }

                    echo "🔒 All credentials validated successfully"
                }
            }
        }

        stage('Validate Environment Files') {
            when {
                branch 'master'
            }
            steps {
                script {
                    echo "🔍 Validating environment files..."

                    if (!fileExists('frontend/.env')) {
                        error "frontend/.env file is missing"
                    }

                    if (!fileExists('backend/.env')) {
                        error "backend/.env file is missing"
                    }

                    def frontendEnv = readFile('frontend/.env')
                    if (!frontendEnv?.trim()) {
                        error "frontend/.env file is empty"
                    }

                    def backendEnv = readFile('backend/.env')
                    if (!backendEnv?.trim()) {
                        error "backend/.env file is empty"
                    }

                    echo "✅ All environment files validated successfully"
                }
            }
        }

        stage('Deploy') {
            when {
                branch 'master'
            }
            steps {
                script {
                    echo "🚀 Starting deployment..."
                    sh 'chmod +x deploy.sh'
                    sh './deploy.sh'
                    echo "✅ Deployment completed successfully"
                }
            }
        }
    }

    post {
        always {
            script {
                def result = currentBuild.result ?: 'SUCCESS'
                def color = (result == 'SUCCESS') ? 3066993 : 15158332
                def status = (result == 'SUCCESS') ? '✅ Success' : '❌ Failure'
                def timestamp = new Date().format("yyyy-MM-dd'T'HH:mm:ss'Z'", TimeZone.getTimeZone('UTC'))

                def payload = [
                    content: null,
                    embeds: [[
                        title: "🚀 Pipeline Execution Report For BSO Blog",
                        description: "Pipeline execution details below:",
                        color: color,
                        thumbnail: [
                            url: "https://raw.githubusercontent.com/bsospace/assets/refs/heads/main/LOGO/LOGO%20WITH%20CIRCLE.ico"
                        ],
                        fields: [
                            [name: "Job", value: "${env.JOB_NAME} [#${env.BUILD_NUMBER}]", inline: true],
                            [name: "Status", value: status, inline: true],
                            [name: "Branch", value: "${env.BRANCH_NAME ?: 'unknown'}", inline: true]
                        ],
                        footer: [
                            text: "Pipeline executed at",
                            icon_url: "https://raw.githubusercontent.com/bsospace/assets/refs/heads/main/LOGO/LOGO%20WITH%20CIRCLE.ico"
                        ],
                        timestamp: timestamp
                    ]]
                ]

                try {
                    if (env.DISCORD_WEBHOOK) {
                        httpRequest(
                            url: env.DISCORD_WEBHOOK,
                            httpMode: 'POST',
                            contentType: 'APPLICATION_JSON',
                            requestBody: groovy.json.JsonOutput.toJson(payload)
                        )
                        echo "✅ Discord notification sent."
                    } else {
                        echo "⚠️ DISCORD_WEBHOOK is not set. Skipping Discord notification."
                    }
                } catch (err) {
                    echo "❌ Failed to send Discord notification: ${err.getMessage()}"
                }
            }
        }
    }
}
