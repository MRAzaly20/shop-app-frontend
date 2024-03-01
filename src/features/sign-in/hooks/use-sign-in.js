import {
  useState
} from 'react'
import {
  signIn
} from '../../../api/user'

export const useSignIn = () => {
  const [state,
    setState] = useState({
      isLoading: false,
      error: null,
    })

  const handleSignIn = async (values) => {
    setState({
      isLoading: true, error: null
    })

    try {
      await signIn(values)
      setState({
        isLoading: false, error: null
      })
    } catch (error) {
      //console.log(error)

      const errorJson = JSON.stringify(error)
      const errorObj = JSON.parse(errorJson);

      console.log(errorObj)
      if (errorObj["code"] === "auth/too-many-requests") {
        const text = "you have made many login attempts, please try again";
        setState({
          isLoading: false, error: text

        })
      }
      if (errorObj["code"] === "auth/wrong-password") {
        const text = "The email or password you entered is incorrect";
        setState({
          isLoading: false, error: text

        })
      }


    }
  }

  return [handleSignIn,
    {
      ...state
    }]
}