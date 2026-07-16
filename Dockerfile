FROM registry.access.redhat.com/ubi9/nodejs-22

WORKDIR /opt/app-root/src

# Create a minimal package.json for the project
RUN echo '{"name":"zot-answer","version":"0.1.0","type":"module","dependencies":{"tsx":"^4"}}' > package.json

# Install tsx for TypeScript execution
RUN npm install --production

# Copy application code
COPY index.ts .
COPY extension.json .

# OpenShift compatibility - need USER 0 for chgrp on COPY'd files
USER 0
RUN chgrp -R 0 /opt/app-root && chmod -R g=u /opt/app-root
USER 1001

# No EXPOSE - this is a CLI tool that reads from stdin/stdout

ENTRYPOINT ["npx", "tsx", "index.ts"]
