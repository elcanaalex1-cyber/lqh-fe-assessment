import { Route, Routes } from 'react-router-dom'
import { Login } from '@/pages/Login'
import { Users } from '@/pages/Users'
import { UserDetails } from '@/pages/UserDetails'
import { DefaultRoute, GuestOnlyRoute, ProtectedRoute } from '@/auth/RouteGuards'

export default function App() {
  return (
    <Routes>
      <Route element={<GuestOnlyRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Route>
      <Route path="*" element={<DefaultRoute />} />
    </Routes>
  )
}
