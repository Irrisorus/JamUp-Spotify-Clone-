import SettingsPage from './SettingsPage/SettingsPage'
import { AuthProvider } from '../../../context/AuthContext'
import './UserSetting.css'

function UserSettings() {
  return (
    <AuthProvider>
      <div className="user-settings-cont">
        <main className="user-settings-content">
          <SettingsPage />
        </main>
      </div>
    </AuthProvider>
  )
}
export default UserSettings