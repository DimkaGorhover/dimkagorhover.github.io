FROM node:14.2.0-alpine3.11

RUN apk add --no-cache \
    zsh \
    git \
    curl

RUN curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh | zsh || true && \
    ZSH_HOME=~/.oh-my-zsh && \
    CUSTOM_PLUGINS_DIR="${ZSH_CUSTOM:-${ZSH_HOME}/custom}/plugins" && \
    git clone \
        --recursive \
        --depth 1 \
        "https://github.com/zsh-users/zsh-syntax-highlighting.git" \
        "${CUSTOM_PLUGINS_DIR}/zsh-syntax-highlighting"

ADD zshrc.sh /root/.zshrc

CMD zsh
