# maidfile

NOTE: `yarn XXX` command invokes the below task, and additional `yarn format` is shortcut to `yarn lint --fix`.

## dev

Start development server.

```bash
set -ex
webpack-dev-server --config webpack.config.js "$@"
```

## build

Build project.

```bash
set -ex
webpack --config webpack.config.js --env.production

# Copy built files to `docs`.
mkdir -p docs
cp -rT dist docs

# Build `docs/index.html`.
cat - readme.md <<HTML |
<!doctype html><meta charset="utf-8"><script src="./main.js"></script><noscript>
<!-- vim: set ft=markdown: -->
---
title: md.html
---

HTML
  sed -Ee '1s/src="[^"]*"/src="main.js"/' \
       -e 's/^.*<!-- MARKER 1 -->$/:sunglasses: **"[View Page Source][raw]" please!! You will see suprising result.**/' \
       -e 's/^.*<!-- MARKER 2 -->$/See [`maidfile.md`](maidfile.md.html) tasks./' > docs/index.html

# Build `docs/maidfile.md.html`.
cat - maidfile.md <<HTML > docs/maidfile.md.html
<!doctype html><meta charset="utf-8"><script src="./main.js"></script><noscript>
<!-- vim: set ft=markdown: -->
---
title: maidfile.md - md.html
---

HTML

# Build `docs/examples`.
(cd examples && find . -type f) | while read filename; do
  mkdir -p docs/examples/$(dirname $filename)
  sed -E '1s/src="([^"]*)main.js"/src="\1..\/main.js"/' examples/$filename > docs/examples/$filename
done
```

## analyze

Ananlyze bundled JavaScript.

```bash
set -ex
mkdir -p docs
webpack --config webpack.config.js --env.production --profile --json > dist/stats.json
webpack-bundle-analyzer dist/stats.json
```

## test

Run test.

```bash
set -ex
jest "$@"
```

## lint

Run linter for source codes.

When `--fix` option is given, linters try to fix errors automatically.

```bash
if [[ $1 == --fix ]]; then
  prettier_opt=--write
else
  prettier_opt=--list-different
fi
set -ex
prettier-package-json 'package.json' $prettier_opt
prettier --ignore-path .gitignore '**/*.{css,js,json,md,yml}' $prettier_opt
```
