pipeline {
  agent any   // Runs on any Jenkins agent (your local machine in this case)

  environment {
    // Use the Azure Static Web App token you saved in Jenkins credentials
    SWA_TOKEN = credentials('swa-deployment-token')
  }

  stages {

    // 1️⃣ Pull latest code from GitHub
    stage('Checkout') {
      steps {
        echo "🔄 Checking out source code from GitHub..."
        checkout scm
      }
    }

    // 2️⃣ Install dependencies
    stage('Install dependencies') {
      steps {
        echo "📦 Installing npm dependencies..."
        sh 'npm install'
      }
    }

    // 3️⃣ Build React app
    stage('Build React App') {
      steps {
        echo "🏗️ Building production version of the app..."
        sh 'REACT_APP_API_URL=$REACT_APP_API_URL npm run build'
      }
    }

    // 4️⃣ Install Azure Static Web Apps CLI
    stage('Setup SWA CLI') {
      steps {
        echo "⚙️ Installing Azure Static Web Apps CLI..."
        sh 'npm install -g @azure/static-web-apps-cli || true'
        sh 'swa --version'
      }
    }

    // 5️⃣ Deploy to Azure Static Web App
    stage('Deploy to Azure') {
      steps {
        echo "🚀 Deploying build folder to Azure Static Web App..."
        sh """
          swa deploy ./build \
          --deployment-token ${SWA_TOKEN} \
          --env production
        """
      }
    }
  }

  post {
    success {
      echo '✅ Build & deployment successful!'
    }
    failure {
      echo '❌ Build or deployment failed. Check the console output for details.'
    }
  }
}
