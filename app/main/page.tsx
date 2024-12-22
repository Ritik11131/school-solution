
import ProtectedRoute from '@/components/protected-route'
import React from 'react'

const MainPage = () => {
  return (
    <ProtectedRoute>
      <div>MainPage</div>
    </ProtectedRoute>
  )
}

export default MainPage;