# Multi-stage build for optimized production image
ARG NODE_VERSION=18
FROM node:${NODE_VERSION}-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json package-lock.json* ./

# Install dependencies (use --legacy-peer-deps for MUI compatibility)
RUN npm ci --legacy-peer-deps && npm cache clean --force

# Copy source code
COPY . .

# Build-time env vars (only for Vite base path and build settings)
# BASE_NAME must be set at build time for Vite to generate correct asset paths
# Set to /admin because ingress preserves the full path (no rewrite-target)
ENV VITE_APP_BASE_NAME=/admin
ENV GENERATE_SOURCEMAP=false
ENV NODE_ENV=production

# Build the application
RUN npm run build

# Production stage - Express server with runtime config API
FROM node:${NODE_VERSION}-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Set working directory
WORKDIR /app

# Install express for serving static files and config API
RUN npm install express

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Copy server file
COPY server.js ./

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs

# Set proper permissions
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Runtime configuration environment variables (can be overridden at runtime)
# SECURITY: Only expose values that frontend needs - never server-side secrets
ENV NODE_ENV=production
ENV PORT=3000
ENV VERSION=v9.2.1
ENV BASE_NAME=/admin
ENV API_URL=https://business.easyreserv.io/
ENV GOOGLE_MAPS_API_KEY=
ENV MAPBOX_ACCESS_TOKEN=

# Expose the application port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/', (r) => {if(r.statusCode !== 200) throw new Error('Health check failed')})" || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start Express server
CMD ["node", "server.js"]
