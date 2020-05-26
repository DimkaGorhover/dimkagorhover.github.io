export ZSH=$HOME/.oh-my-zsh
ZSH_THEME="robbyrussell"
DISABLE_AUTO_UPDATE="true"
ENABLE_CORRECTION="false"

plugins=(
    git
    zsh-syntax-highlighting
    yarn
    npm
    npx
    node
)

source $ZSH/oh-my-zsh.sh

echo "you are inside \"$(hostname)\" host as \"$(whoami)\""
