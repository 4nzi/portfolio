import * as functions from 'firebase-functions'
import * as nodemailer from 'nodemailer'
import { IRequest } from './types'

const send = (req: IRequest): void => {
  //SMTPサーバ基本情報設定
  const transporter = nodemailer.createTransport({
    port: functions.config().transporter.port,
    host: functions.config().transporter.host,
    auth: {
      user: functions.config().transporter.user,
      pass: functions.config().transporter.pass,
    },
    secure: true,
  })

  const toHostMailData = {
    to: 'beanjam@outlook.jp',
    from: functions.config().transporter.user,
    subject: req.subject,
    html: `
    <p>【名前】</p>
    <p>${req.name}</p>
    <p>【メッセージ】</p>
    <p>${req.message}</p>
    <p>【メールアドレス】</p>
    <p>${req.email}</p>
  `,
  }

  const toGuestMailData = {
    to: `${req.email}`,
    from: functions.config().transporter.user,
    subject: `【お問い合わせ自動受付メール】`,
    html: `
      <p>
        お問い合わせありがとうございます。
        <br>以下の内容でお問い合わせを承りました。
      </p>
      <p>-----------------------------------------</p>
      <h2>お問い合わせ内容</h2>
      <p>【名前】</p>
      <p>${req.name}</p>
      <p>【メッセージ】：</p>
      <p>${req.message}</p>
      <p>【メールアドレス】</p>
      <p>${req.email}</p>
      <p>-----------------------------------------</p>
    `,
  }

  // メール送信
  try {
    transporter.sendMail(toHostMailData, (error, success) => {
      if (error) {
        console.log('送信に失敗しました')
        return
      }
      console.log('送信に成功しました')
      transporter.sendMail(toGuestMailData, function (err, info) {
        if (err) console.log(err)
        else console.log(info)
      })
    })
  } catch (e) {
    console.log('送信に失敗しました')
  }
}

export default send
