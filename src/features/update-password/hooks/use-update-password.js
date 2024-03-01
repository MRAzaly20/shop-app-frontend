import {
  useState
} from 'react'
import {
  updatePass
} from '../../../api/user'

export const useUpdatePassword = () => {
  const [state,
    setState] = useState({
      isLoading: false,
      error: null,
    })

  const handleUpdatePassword = async (values) => {
    setState({
      isLoading: true, error: null
    })

    try {
      await updatePass(values)
      setState({
        isLoading: false, error: null
      })
    } catch (error) {
      setState({
        isLoading: false, error
      })
      throw error
    }
  }

  return [handleUpdatePassword,
    {
      ...state
    }]
}