import React, { useState, ChangeEvent, FormEvent } from 'react'
import styled from 'styled-components'
import { Input, TextArea, Button, Label } from '../components/index'

import axios from 'axios'
import { FORM_DATA } from '../types/types'
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

  const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const mailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value)
  }

  const massageChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
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
      const payload: FORM_DATA = {
        name: name,
        mail: mail,
        message: message,
      }

      try {
        await axios.post(
          'https://us-central1-mailer-47919.cloudfunctions.net/api/',
          JSON.stringify(payload),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        alert('送信が完了しました。追ってご連絡いたします。')
        setMessage('')
        setMail('')
        setName('')
      } catch {
        alert('送信に失敗しました。')
        setMessage('')
        setMail('')
        setName('')
      }
    }
  }

  return (
    <Wapper onSubmit={submitHandler}>
      <div className="name">
        <Label>NAME*</Label>
        <Input value={name} onChange={nameChangeHandler} />
      </div>
      <div className="mail">
        <Label>E-mail*</Label>
        <Input value={mail} onChange={mailChangeHandler} />
      </div>
      <div className="mess">
        <Label>MASSAGE*</Label>
        <TextArea
          cols={30}
          rows={10}
          value={message}
          onChange={massageChangeHandler}
        />
      </div>
      <Button type="submit">送信</Button>
    </Wapper>
  )
}

export default Hello
