import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import { supabase } from '../../services/api'

const Settings = () => {
  const [vatPercentage, setVatPercentage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('vat_settings')
        .select('*')
        .single()
      
      if (error) throw error
      if (data) {
        setVatPercentage(data.vat_percentage)
      }
    } catch (err) {
      console.error('Error loading settings:', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const { error } = await supabase
        .from('vat_settings')
        .update({ vat_percentage: parseFloat(vatPercentage) })
        .eq('id', 1)
      
      if (error) throw error
      setSuccess('Settings updated successfully')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>

          <div className="card max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">VAT Configuration</h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">VAT Percentage (%)</label>
                <input
                  type="number"
                  value={vatPercentage}
                  onChange={(e) => setVatPercentage(e.target.value)}
                  className="input"
                  step="0.01"
                  min="0"
                  max="100"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  This VAT rate will be applied to all sales
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? 'Saving...' : 'Save Settings'}
              </button>
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default Settings
