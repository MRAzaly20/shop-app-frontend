import {
  useState
} from 'react'
import {
  signOutUser
} from '../api/user'

export const useSignOut = () => {
  const [state,
    setState] = useState({
      isLoading: false,
      error: null,
    })

  const handleSignOut = async () => {
    setState({
      isLoading: true, error: null
    })

    try {
      await signOutUser()
      setState({
        isLoading: false, error: null
      })
    } catch (error) {
      setState({
        isLoading: false, error
      })
    }
  }

  return [handleSignOut,
    {
      ...state
    }]
}