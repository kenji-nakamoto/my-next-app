# Nodeイメージの取得
FROM node:18.13.0-alpine
# 言語対応
ENV LANG C.UTF-8
# ワーキングディレクトリの指定
WORKDIR /app
# パッケージをコピー(このファイルだけ別にして先にインストールしたほうが良い)
COPY package.json ./

RUN npm cache verify && npm install
# その他のファイルをコピー
COPY . .
# なくても良い
ENV HOST 0.0.0.0
# なくても良い
EXPOSE 9090
# 起動コマンド
CMD ["/bin/ash"]
