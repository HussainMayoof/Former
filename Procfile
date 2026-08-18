release: sh -c '[ "$BUILD_TARGET" = "backend" ] && npx prisma migrate deploy --config packages/shared/prisma.config.ts || true'
web: npm run start -w former-$BUILD_TARGET