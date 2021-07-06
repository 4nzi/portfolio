import styled from 'styled-components'
import { Button } from './index'

/* --------------------- Style --------------------- */
const Wrapper = styled.div`
  text-align: center;
  > button {
    padding: 3px 6px;
  }
  > div {
    position: relative;
    overflow: hidden;
    padding-top: 100%; //比率//
    margin-bottom: 20px;
    background: #1a1a1a;
    > img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    > div {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      object-fit: cover;
      border: 2px dashed #333;
    }
  }
`
/* ------------------------------------------------- */

interface PROPS {
  src: string
  onChange: React.ChangeEventHandler
}

const AddThum: React.VFC<PROPS> = ({ src, onChange }) => {
  return (
    <Wrapper>
      <div>{src ? <img src={src} /> : <div></div>}</div>
      <Button
        sType="box"
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.preventDefault()
          document.getElementById('thum').click()
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          width="14px"
        >
          <path
            fillRule="evenodd"
            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
      <input
        id="thum"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={onChange}
      />
    </Wrapper>
  )
}

export default AddThum
