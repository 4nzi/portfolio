import React from 'react'
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

  return (
    <Wapper>
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
          cols={30}
          rows={10}
          value={message}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setMessage(e.target.value)
          }
        />
      </div>
      <Button type="submit">送信</Button>
    </Wapper>
  )
}

export default Hello
