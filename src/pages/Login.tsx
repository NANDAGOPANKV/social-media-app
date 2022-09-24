import React from 'react'
// firebase stuff's
import { auth, provider } from '../config/Firebase'
import { signInWithPopup } from 'firebase/auth'
// router
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const NavigateTo = useNavigate()
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider)
    console.log(result);
    NavigateTo('/')

  }
  return (
    <div>
      <p>Sign In With Google To Continue</p>
      <button onClick={signInWithGoogle} >Sign In With Google</button>
    </div>
  )
}
