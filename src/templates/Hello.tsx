import styled from 'styled-components'
import { useState } from 'react'
import { Input, TextArea, Button, Label } from '../components/index'
import { useValidate } from '../hooks/useValidate'

/* --------------------- Style --------------------- */
const Wapper = styled.form`
  display: grid;
  grid-template:
    'name .... mail'
    '.... .... ....' 20px
    'mess mess mess' 1fr
    '.... .... ....' 20px
    'sub  sub  sub ' 10px
    /1fr 6px 2fr;

  > .name {
    grid-area: name;
  }
  > .mail {
    grid-area: mail;
  }
  > .mess {
    grid-area: mess;
  }
  > button {
    grid-area: sub;
    text-align: center;
    font-size: 1.4rem;
  }
`
/* ------------------------------------------------- */

const Hello: React.VFC = () => {
  const { required, emailFormat } = useValidate()
  const [name, setName] = useState('')
  const [mail, setMail] = useState('')
  const [message, setMessage] = useState('')

  const submitHandler = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault()
    const isBlank = required(name, mail, message)
    const isValidEmail = emailFormat(mail)

    if (isBlank) {
      alert('必須入力欄が空白です。')
      return false
    } else if (!isValidEmail) {
      alert('メールアドレスの書式が異なります。')
      return false
    } else {
      const payload = {
        text:
          '---------------------------------\n' +
          'お名前:' +
          name +
          '\n' +
          'メールアドレス: ' +
          mail +
          '\n' +
          '【問い合わせ内容】\n' +
          message,
      }

      // フォームの内容をSlackのIncoming Webhook URL に送信する
      await fetch(process.env.NEXT_PUBLIC_WEBHOOK_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      alert('送信が完了しました。追ってご連絡いたします🙌')
      setMessage('')
      setMail('')
      setName('')
    }
  }

  return (
    <Wapper id="hello">
      <div className="name">
        <Label>NAME*</Label>
        <Input
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
      </div>
      <div className="mail">
        <Label>E-mail*</Label>
        <Input
          value={mail}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMail(e.target.value)
          }
        />
      </div>
      <div className="mess">
        <Label>MASSAGE*</Label>
        <TextArea
          value={message}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMessage(e.target.value)
          }
        />
      </div>
      <Button type="submit" onClick={submitHandler}>
        送信
      </Button>
    </Wapper>
  )
}

export default Hello
