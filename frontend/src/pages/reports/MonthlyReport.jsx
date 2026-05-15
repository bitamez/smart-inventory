import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import { reportService } from '../../services/reportService'
import { formatCurrency } from '../../utils/formatCurrency'

const MonthlyReport = () => {
  const currentDate = new Date()
  const [year, setYear] = useState(currentDate.getFullYear())
  const [month, setMonth] = useState(currentDate.getMonth() + 1)
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadReport = async () => {
    setLoading(true)
    setError('')
    const { data, error } = await reportService.getMonthlyReport(year, month)
    if (data) {
      const totalSales = data.length
      const totalRevenue = data.reduce((sum, sale) => sum + sale.total_amount, 0)
      const avgSale = totalSales > 0 ? totalRevenue / totalSales : 0
      setReport({ sales: data, totalSales, totalRevenue, avgSale })
    } else if (error) {
      setError(error)
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Monthly Sales Report</h1>
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          <div className="card mb-6">
            <div className="flex gap-4 items-end">
              <div>
                <label className="block text-sm font-medium mb-1">Year</label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value))}
                  className="input w-32"
                  min="2020"
                  max="2100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Month</label>
                <select
                  value={month}
                  onChange={(e) => setMonth(parseInt(e.target.value))}
                  className="input"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {new Date(2000, i).toLocaleString('default', { month: 'long' })}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={loadReport}
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? 'Loading...' : 'Generate Report'}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {report && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="card">
                  <p className="text-sm text-gray-500 mb-1">Total Sales</p>
                  <p className="text-3xl font-bold">{report.totalSales}</p>
                </div>
                <div className="card">
                  <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold text-primary">{formatCurrency(report.totalRevenue)}</p>
                </div>
                <div className="card">
                  <p className="text-sm text-gray-500 mb-1">Average Sale</p>
                  <p className="text-3xl font-bold">{formatCurrency(report.avgSale)}</p>
                </div>
              </div>

              <div className="card">
                <h2 className="text-xl font-semibold mb-4">Monthly Summary</h2>
                <p className="text-gray-600">
                  Total of {report.totalSales} sales completed in{' '}
                  {new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' })}
                </p>
              </div>
            </>
          )}
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default MonthlyReport
