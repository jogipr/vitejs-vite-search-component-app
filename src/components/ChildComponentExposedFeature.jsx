
import { forwardRef, useImperativeHandle } from 'react';

export const ChildComponentExposedFeature = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => {
      return {
        handleClickMe
      }
    })
  
    const handleClickMe = () => {
      alert("hi")
    }
    return (
      <div>
        Click the parent button ,I will say Hi
      </div>
    )
  })