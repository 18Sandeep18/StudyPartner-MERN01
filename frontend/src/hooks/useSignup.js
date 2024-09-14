import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const { dispatch } = useAuthContext()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const signup = async (name, email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            //save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update the Authcontext
            dispatch({ type: 'LOGIN', payload: json })
            setIsLoading(false)
        }

    }

    return { signup, isLoading, error }
}