# From root

find . -name "*.test.js"
find . -name "*.test.js" -not -path '*node_modules*'
find . -name "*.js" -not -path '*node_modules*'
find . -name "*.test.js" -exec grep -Hn "describe" {} \;

npm i -g ipt
find . -name "*.js" -not -path '*node_modules*' | ipt

cp -r #copia pastas e conteúdos

CONTENT="'use strict';"
find . -name "*.js" -not -path '*node_modules*' \
    | ipt -o \
    | xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\
    /g' {file}

# 1s - primeira linha
# ^ - início da linha

# sem ipt
CONTENT="'use strict';"
find . -name "*.js" -not -path '*node_modules*' \
    | xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\
    /g' {file}