import styled from 'styled-components'
import { useState } from 'react'
import {
  Input,
  Frame,
  TextArea,
  ImagePreview,
  AddThum,
  Button,
} from '../../components/index'

import { useMutatePost } from '../../hooks/useMutatePost'
import { useValidate } from '../../hooks/useValidate'

/* --------------------- Style --------------------- */
const Wrapper = styled.form`
  display: grid;
  gap: 25px;
  grid-template:
    'tit  tit'
    'art  thu'
    'img  thu'
    'pre  thu'
    'des  thu'
    'sub  thu'
    /3fr 1fr;
  > h2 {
    grid-area: tit;
    font-size: 3.2rem;
  }
  > .artworkTitle {
    grid-area: art;
  }
  > .descripton {
    grid-area: des;
  }
  > .thum {
    grid-area: thu;
  }
  > .addImage {
    gap: 0px;
    grid-area: img;
    padding: 0 12px 80px;
    border: 2px dashed #333;
    border-radius: 5px;
    position: relative;
    text-align: center;
    height: 200px;
    > button {
      margin-top: 60px;
      margin-bottom: 10px;
    }
    > p {
      font-size: 1.2rem;
    }
  }
  > .previewImageList {
    grid-area: pre;
    display: grid;
    grid-auto-flow: row;
    gap: 20px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    > .plus {
      position: relative;
      background-color: transparent;
      cursor: pointer;
      transition: background-color 0.2s;
      border-radius: 25px;
      max-width: 324px;
      height: 324px;
      &:hover {
        background-color: rgb(46, 50, 52);
      }
      > svg {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        width: 4.2rem;
      }
    }
  }
  > .submit {
    grid-area: sub;
  }
`
/* ------------------------------------------------- */

const NewPost: React.VFC = () => {
  const { newPost } = useMutatePost()
  const { required } = useValidate()

  const [thum, setThum] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [previewThum, setPreviewThum] = useState<string | null>(null)
  const [previewImages, setPreviewImages] = useState<string[]>([])

  const [decodableThum, setDecodableThum] = useState<string | null>(null)

  const submitHandler = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const isBlank = required(previewThum, title, description, previewImages)
    if (isBlank) {
      alert('全ての項目を入力してください。')
      return false
    } else {
      const payload = {
        thum: thum,
        title: title,
        description: description,
        images: images,
      }
      await newPost(payload)
      setTitle('')
      setDescription('')
      setThum(null)
      setPreviewThum(null)
      setImages([])
      setPreviewImages([])
    }
  }

  const thumInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0]
    setThum(file)
    /* ---- preview ----- */
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setPreviewThum(reader.result as string)
      if (file.type === 'image/jpeg') {
        setDecodableThum(
          String(reader.result as string).replace('data:image/jpeg;base64,', '')
        )
      } else {
        setDecodableThum(
          String(reader.result as string).replace('data:image/png;base64,', '')
        )
      }
    }
    e.target.files = null
    console.log(thum)
    console.log(previewThum)
    console.log(decodableThum)
  }

  const imageInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0]
    setImages((prevState) => [...prevState, file])
    /* ---- preview ----- */
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setPreviewImages((prevState) => [...prevState, reader.result as string])
    }
    e.target.value = null
  }

  const deletePreviewImage = (index: number) => {
    const targetImage = images[index]
    const newImages = images.filter((image) => image !== targetImage)
    const newPreviewImages = previewImages
    newPreviewImages.splice(index, 1)
    setImages(newImages)
    setPreviewImages(newPreviewImages)
  }

  return (
    <Wrapper>
      <h2> {title ? title : '新規投稿'}</h2>
      <div className="artworkTitle">
        <Frame title="タイトル">
          <Input
            value={title}
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
        </Frame>
      </div>
      <input
        id="imageInput"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={imageInputHandler}
      />
      {previewImages.length === 0 && (
        <div className="addImage">
          <Button
            sType="color"
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              e.preventDefault()
              document.getElementById('imageInput').click()
            }}
          >
            ファイルを選択
          </Button>
          <p>JPEG GIF PNG</p>
          <p>1枚10MB以内、最大5枚アップロードできます。</p>
        </div>
      )}

      <ul className="previewImageList">
        {previewImages!.map((previewImage, index) => (
          <li key={index}>
            <ImagePreview
              onclick={() => deletePreviewImage(index)}
              src={previewImage}
              index={index + 1}
            />
          </li>
        ))}
        {previewImages.length > 0 && previewImages.length < 5 && (
          <li
            className="plus"
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              e.preventDefault()
              document.getElementById('imageInput').click()
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </li>
        )}
      </ul>
      <div className="descripton">
        <Frame title="説明">
          <TextArea
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
          />
        </Frame>
      </div>
      <div className="thum">
        <Frame title="サムネイル">
          <AddThum src={previewThum} onChange={thumInputHandler} />
        </Frame>
      </div>
      <div className="submit">
        <Button sType="box" onClick={submitHandler}>
          送信
        </Button>
      </div>
    </Wrapper>
  )
}
export default NewPost
