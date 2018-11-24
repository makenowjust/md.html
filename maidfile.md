# maidfile

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
cat - readme.md <<HTML |
<!doctype html><meta charset="utf-8"><script src="./main.js"></script><noscript>
<!-- vim: set ft=markdown -->

HTML
  sed -Ee '1s/src="[^"]*"/src=".\/main.js"/' \
       -e 's/^.*<!-- MARKER -->$/:sunglasses: **"View Page Source" please!! You will see suprising result.**/' > docs/index.html
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
