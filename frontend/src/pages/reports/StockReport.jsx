import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import { reportService } from '../../services/reportService'
import { formatCurrency } from '../../utils/formatCurrency'

const StockReport = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadReport()
  }, [])

  const loadReport = async () => {
    const { data, error } = await reportService.getStockReport()
    if (data) {
      setProducts(data)
    } else if (error) {
      setError(error)
    }
    setLoading(false)
  }

  const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0)
  const lowStockCount = products.filter(p => p.quantity <= p.minimum_stock_level).length

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Stock Report</h1>

          {loading && <div className="text-center py-12">Loading...</div>}
          {error && <div className="text-red-600 text-center py-12">{error}</div>}

          {products && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="card">
                  <p className="text-sm text-gray-500 mb-1">Total Products</p>
                  <p className="text-3xl font-bold">{products.length}</p>
                </div>
                <div className="card">
                  <p className="text-sm text-gray-500 mb-1">Total Stock Value</p>
                  <p className="text-3xl font-bold text-primary">{formatCurrency(totalValue)}</p>
                </div>
                <div className="card">
                  <p className="text-sm text-gray-500 mb-1">Low Stock Items</p>
                  <p className="text-3xl font-bold text-danger">{lowStockCount}</p>
                </div>
              </div>

              <div className="card">
                <h2 className="text-xl font-semibold mb-4">Stock Details</h2>
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>SKU</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Min Level</th>
                        <th>Unit Price</th>
                        <th>Total Value</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => {
                        const isLow = product.quantity <= product.minimum_stock_level
                        return (
                          <tr key={product.id}>
                            <td className="font-mono">{product.sku}</td>
                            <td>{product.name}</td>
                            <td className={isLow ? 'text-danger font-semibold' : ''}>
                              {product.quantity}
                            </td>
                            <td>{product.minimum_stock_level}</td>
                            <td>{formatCurrency(product.price)}</td>
                            <td className="font-semibold">
                              {formatCurrency(product.price * product.quantity)}
                            </td>
                            <td>
                              {isLow ? (
                                <span className="text-xs px-2 py-1 rounded bg-danger text-white">
                                  Low Stock
                                </span>
                              ) : (
                                <span className="text-xs px-2 py-1 rounded bg-success text-white">
                                  OK
                                </span>
                              )}
                            </td>
                          </tr>
                        )
                      })}
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

export default StockReport
