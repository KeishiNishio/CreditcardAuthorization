FROM python:3.8-slim

# /appディレクトリを作成し、作業ディレクトリとして設定
WORKDIR /app

# requirements.txtをコンテナ内の/appにコピー
COPY requirements.txt /app/

RUN pip install --no-cache-dir -r requirements.txt

# 現在のディレクトリの内容をコンテナ内の/appにコピー
COPY . /app/

# コンテナを起動する際に実行されるコマンド
CMD ["python", "app.py"]
