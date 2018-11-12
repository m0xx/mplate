#!/usr/bin/env bash

set -x
set -e

npm i -g
mplate --help
mplate --version

echo "Welcome {{ username }}!" | mplate --context "{\"username\": \"admin\"}" --engine handlebars > test/results/handlebar.txt
diff test/expected/handlebar.txt test/results/handlebar.txt

echo "Welcome <%= user.name %>!" | mplate --context-file test/context.yaml --context-format yaml > test/results/context.txt
diff test/expected/context.txt test/results/context.txt

EXAMPLE_ENV_VAR="admin" mplate --use-env -f test/env.ejs -o test/results/env.txt
diff test/expected/env.txt test/results/env.txt

npm uninstall -g