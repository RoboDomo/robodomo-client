#!/bin/bash

yarn --cwd ./e2e-tests run test:bs_cloud_smoke --baseUrl=http://localhost:3000 --user=${BS_USER} --key=${BS_KEY} --cucumberOpts.tagExpression='@automated and @smoke'
