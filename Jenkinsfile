pipeline {
  agent any

  environment {
    REACT_APP_GOOGLE_CLIENT_ID = credentials('google-client-id')
    REACT_APP_ENCRYPTION_KEY   = credentials('encryption-key')
    SWA_TOKEN = credentials('swa-deployment-token')
  }

  stages {

    // 0️⃣ Install Node 18 (REQUIRED)
    stage('Install Node 18 using NVM') {
      steps {
        echo "📥 Installing Node 18..."
        sh '''
          export NVM_DIR="$HOME/.nvm"
          
          # Install NVM if missing
          if [ ! -d "$NVM_DIR" ]; then
            echo "Installing NVM..."
            git clone https://github.com/nvm-sh/nvm.git "$NVM_DIR"
            cd "$NVM_DIR" && git checkout v0.39.3
          fi

          # Load NVM
          . "$NVM_DIR/nvm.sh"

          # Install and use Node 18
          nvm install 18
          nvm use 18

          node -v
          npm -v
        '''
      }
    }

    // 1️⃣ Checkout code
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
        sh '''
          export NVM_DIR="$HOME/.nvm"
          . "$NVM_DIR/nvm.sh"
          nvm use 18

          npm install
        '''
      }
    }

    // 3️⃣ Build React app with environment variables
    stage('Build React App') {
  steps {
    echo "🏗️ Building production version of the app..."

    withEnv([
      "REACT_APP_GOOGLE_CLIENT_ID=${REACT_APP_GOOGLE_CLIENT_ID}",
      "REACT_APP_ENCRYPTION_KEY=${REACT_APP_ENCRYPTION_KEY}"
    ]) {
      sh '''
        export NVM_DIR="$HOME/.nvm"
        . "$NVM_DIR/nvm.sh"
        nvm use 18

        echo "Using GOOGLE CLIENT ID: $REACT_APP_GOOGLE_CLIENT_ID"
        echo "Using ENCRYPTION KEY: $REACT_APP_ENCRYPTION_KEY"

        CI=false npm run build
      '''
    }
  }
}


    // 4️⃣ Install SWA CLI
    stage('Setup SWA CLI') {
      steps {
        echo "⚙️ Installing Azure Static Web Apps CLI..."
        sh '''
          export NVM_DIR="$HOME/.nvm"
          . "$NVM_DIR/nvm.sh"
          nvm use 18

          npm install -g @azure/static-web-apps-cli || true
          swa --version
        '''
      }
    }

    // 5️⃣ Deploy
    stage('Deploy to Azure') {
      steps {
        echo "🚀 Deploying to Azure Static Web App..."
        sh '''
          export NVM_DIR="$HOME/.nvm"
          . "$NVM_DIR/nvm.sh"
          nvm use 18

          swa deploy ./build \
            --deployment-token ${SWA_TOKEN} \
            --env production
        '''
      }
    }
  }

  post {
    success { echo '✅ Build & deployment successful!' }
    failure { echo '❌ Build or deployment failed. Check console output.' }
  }
}
