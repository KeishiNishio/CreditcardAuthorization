# Payment Processing Application

---

## 概要

このリポジトリは、ReactフロントエンドとFlaskバックエンドを組み合わせた支払い処理Webアプリケーションです。ユーザーはフォームにID、カードの有効期限、支払い額を入力し、承認願いを通知します。支払いが承認されると、確認ボタンが表示され、支払い額が確定し、請求されるという仕組みになっています。また、挙動の確認のために、利用可能額と請求額を確認する機能も追加しています。

このシステムを実装した主な動機は、クレジットカード決済のプロセスをより深く理解することです。日常生活で頻繁に使用しているにも関わらず、その背後にある複雑なメカニズムは多くの人はわからない状態だと思います。具体的には、オーソリゼーション処理、つまり取引の正当性を確認し、支払いが承認されるまでの一連のステップに焦点を当てました。これを理解することで、セキュリティや取引の効率性についての知識を深めることができます。さらに、Dockerを使用してシステムを構築することで、コンテナ技術を実際に手を動かしながら学ぶためです。

### **オーソリゼーションについて**

ざっくり説明すると、オーソリゼーション処理とはクレジットカードが利用できるかどうかを確認する処理で以下のような手順によって、検証されています。

1. **購入時：**ユーザが加盟店で商品やサービスを購入し、クレジットカードでの支払いを検討
2. **オーソリゼーション要求**: 加盟店は、顧客のクレジットカード情報と購入金額をクレジットカード会社に送信し、オーソリゼーションをリクエスト
3. **承認プロセス**: クレジットカード会社は、カードの有効性、有効期限、限度額内であるかどうかを確認し、取引が正当かどうかを判断
4. **オーソリゼーション応答**: 承認が下りれば、オーソリゼーションコードとともに加盟店に承認応答が通知。承認拒否の場合は、その理由が通知
    1. 今回の実装では、以下を確認する機能のみ実装した
        1. **クレジットカードの有効性（ID番号が正当かどうか）**
        2. **有効期限切れでないかどうか**
        3. **利用可能限度額を超過していないかどうか**
5. **決済**: 承認された場合、加盟店側で決済金額を確定後、クレジットカード会社側に通知され、決済確定処理が行われ、最終的にユーザに請求がなされる。（翌月の請求額の更新）

## 技術スタック

- フロントエンド: React(java srcipt),~~html,css~~
- バックエンド: Flask(python)
- その他の技術: Docker(& Docker Compose), Nginx（リバースプロキシのために利用）

![スクリーンショット 2024-01-05 1.22.15.png](Payment%20Processing%20Application%20b1690060fd79489eafcf1f39141ad5e6/%25E3%2582%25B9%25E3%2582%25AF%25E3%2583%25AA%25E3%2583%25BC%25E3%2583%25B3%25E3%2582%25B7%25E3%2583%25A7%25E3%2583%2583%25E3%2583%2588_2024-01-05_1.22.15.png)

システム構成図

## 機能

- 支払い情報の送信
- 支払いの承認と確認
- 利用可能額と請求額の確認

## ディレクトリ構成

・backend、frontend、nginx の3つの主要なサーバから構成されていて、それらの名前を持つディレクトリ内でそれぞれのサーバを構築するファイルを用意しています。）

1. バックエンド
- Dockerfile
    - バックエンドアプリケーションのDockerイメージを構築
- app.py
    - FlaskなどのPythonフレームワークを使ったバックエンドアプリケーション用スクリプト
- requirements.txt
    - アプリケーションが依存するPythonパッケージのリスト
1. フロントエンド
- build/
    - **`npm run build`**から生成された静的ファイル群
- node_modules/
    - プロジェクトの依存関係がインストールされるディレクトリ
- public/index.html
    - アプリケーションのエントリーポイントとなるHTMLファイル
- src/: React（Java script）のソースコードが含まれていて、`App.js,index.js,index.css`

があります。

- Dockerfile
    - フロントエンドのDockerイメージを構築するための設定ファイル
- package-lock.json と package.json
    - プロジェクトの依存関係やスクリプトの定義
1. Nginx
- default.conf
    - Nginx の設定ファイルで、リバースプロキシの設定ファイル
1. Docker Composeファイル
    - オーケストレーションファイル
2. その他のファイル:
    - conposition.txt
        - ファイル構成図

## セットアップ方法

1. リポジトリをクローンします。

```bash
git clone <https://github.com/your-username/your-repository-name.git>
```

1. Dockerネットワークを作成

```bash
docker network create nginx-network
```

1. frontendディレクトリに移動

```bash
cd frontend
```

1. フロントエンド依存関係のインストール: フロントエンドディレクトリで **`npm install`** を実行

```bash
**npm install** 
```

1. Node.jsのTLS（Transport Layer Security）暗号ライブラリに関連する設定をする

```bash
export NODE_OPTIONS=--openssl-legacy-provider
```

1. アプリケーションのビルド:(frontendディレクトリ 内) 

```bash
**npm run build**
```

1. 上位のディレクトリに移動

```bash
cd ..
```

1. Docker Composeを使用してサービスを起動: プロジェクトのルートディレクトリで **`docker-compose up`** を実行。

```bash
docker-compose build --no-cache

```

1. Docker Composeを使用してサービスを起動: プロジェクトのルートディレクトリで **`docker-compose up`** を実行。

```bash
docker-compose up -d
```

1. ブラウザで `http://localhost` にアクセスしてアプリケーションを使用します。

## 便利なコマンド

システム全体のDockerキャッシュを削除

```bash
docker system prune --all --force
```

設定したネットワークにコンテナが所属しているか確認

```bash
docker network inspect nginx-network
```

コンテナの状況確認

```bash
docker ps -a
```

存在する全てのコンテナを停止

```bash
docker stop $(docker ps -aq) || true
```

存在する全てのコンテナを削除

```bash
docker rm -f $(docker ps -aq) || true
```

参考サイト

システム構築関連

[https://cloudsmith.co.jp/blog/virtualhost/docker/2022/12/2241971.html](https://cloudsmith.co.jp/blog/virtualhost/docker/2022/12/2241971.html)

クレジットカード決済関連

[https://www.saisoncard.co.jp/credictionary/knowledge/article045.html](https://www.saisoncard.co.jp/credictionary/knowledge/article045.html)[https://www.youtube.com/watch?v=rVrM8S7Rfdk](https://www.youtube.com/watch?v=rVrM8S7Rfdk)

[https://www.youtube.com/watch?v=rVrM8S7Rfdk](https://www.youtube.com/watch?v=rVrM8S7Rfdk)