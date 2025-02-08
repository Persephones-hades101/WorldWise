import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/FakeAuthContext'
import { useEffect } from 'react'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(function () {
    if (!isAuthenticated) navigate("/")
  }, [isAuthenticated])

  return isAuthenticated ? children : null
  // return children
}
