# Eon SandBox
Eon SandBox creates a folder at the same level of the current working directory,
so basically if Deno is running in `/home/app`, Eon SandBox will create `/home/.eon`

all the files, excepted `tsconfig.json | .git/* | .vscode/* | node_modules/*` are copied into this sandbox.
this sandbox allows a better resolution of the imported components.