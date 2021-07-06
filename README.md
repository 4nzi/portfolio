# portfolio

画像作品のポートフォリオサイトです。  
主な機能としては、ポートフォリオ・問い合わせ・管理画面での新規投稿・削除になります。  
サイズの大きい画像を扱うことを想定し、Next.js/Vercel/Django
で高速なポートフォリオサイトを構築しています。

# 機能

- ポートフォリオ(SSG + ISR)
- お問い合わせフォーム(Slack への通知)
- 管理画面(CSR)
  - ログイン機能(JWT 認証)
  - 投稿画像のプレビュー

# 使用技術

- React 17.0.2
- Next.js 10.2.3
- React Query(サーバーデータの管理)
- Jotai(クライアントデータの管理)
- Styled Components
- Slack Incoming Webhook
- Django REST Framework(API)

# インフラ構成

- Next.js
  - Vercel
- Django
  - EC2
  - S3
  - Route53

# テスト

- Jest, testing-library
  - 単体テスト
