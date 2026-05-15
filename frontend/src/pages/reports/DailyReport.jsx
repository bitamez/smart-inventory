import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import { reportService } from '../../services/reportService'
import { formatCurrency } from '../../utils/formatCurrency'

const DailyReport = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadReport = async () => {
    setLoading(true)
    setError('')
    const { data, error } = await reportService.getDailyReport(date)
    if (data) {
      const totalSales = data.length
      const totalRevenue = data.reduce((sum, sale) => sum + sale.total_amount, 0)
      const totalItems = data.reduce((sum, sale) => 
        sum + (sale.sale_items?.reduce((s, item) => s + item.quantity, 0) || 0), 0
      )
      setReport({ sales: data, totalSales, totalRevenue, totalItems })
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
          <h1 className="text-3xl font-bold mb-6">Daily Sales Report</h1>

          <div className="card mb-6">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Select Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="input"
                />
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
                  <p className="text-sm text-gray-500 mb-1">Items Sold</p>
                  <p className="text-3xl font-bold">{report.totalItems}</p>
                </div>
              </div>

              <div className="card">
                <h2 className="text-xl font-semibold mb-4">Sales Details</h2>
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Invoice #</th>
                        <th>Time</th>
                        <th>Customer</th>
                        <th>Items</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {report.sales.map((sale) => (
                        <tr key={sale.id}>
                          <td className="font-mono">{sale.invoice_number}</td>
                          <td>{new Date(sale.created_at).toLocaleTimeString()}</td>
                          <td>{sale.customer_name || 'Walk-in'}</td>
                          <td>{sale.sale_items?.length || 0}</td>
                          <td className="font-semibold">{formatCurrency(sale.total_amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default DailyReport
