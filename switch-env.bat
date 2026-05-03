@echo off
REM Quick environment switcher for testing vs production

IF "%1"=="test" (
    echo Switching to TEST environment...
    copy .env.test .env.local
    echo.
    echo ✅ TEST environment active!
    echo.
    echo Next steps:
    echo 1. Make sure you have customer's TEST Stripe keys in .env.test
    echo 2. Run: stripe listen --forward-to http://localhost:3000/api/webhook
    echo 3. Copy the webhook secret and update .env.local
    echo 4. Run your dev server
    echo.
) ELSE IF "%1"=="prod" (
    echo ⚠️  WARNING: Switching to PRODUCTION environment
    echo This will use LIVE Stripe keys!
    echo.
    set /p confirm="Are you sure? (yes/no): "
    IF /I "%confirm%"=="yes" (
        copy .env.production .env.local
        echo.
        echo ✅ PRODUCTION environment active!
        echo.
        echo ⚠️  You are now using LIVE credentials!
        echo Make sure Vercel env vars are set before deploying.
    ) ELSE (
        echo Cancelled.
    )
) ELSE (
    echo Usage: switch-env.bat [test^|prod]
    echo.
    echo Examples:
    echo   switch-env.bat test    - Switch to test environment
    echo   switch-env.bat prod    - Switch to production environment
)
