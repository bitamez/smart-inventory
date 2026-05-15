import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import { salesService } from '../../services/salesService'
import { formatCurrency } from '../../utils/formatCurrency'

const Invoice = () => {
  const { id } = useParams()
  const [sale, setSale] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadSale()
  }, [id])

  const loadSale = async () => {
    const { data, error } = await salesService.getSale(id)
    if (data) {
      setSale(data)
    } else if (error) {
      setError(error)
    }
    setLoading(false)
  }

  const handlePrint = () => {
    window.print()
  }

  if (loading) return <div className="text-center py-12">Loading...</div>
  if (error) return <div className="text-red-600 text-center py-12">{error}</div>
  if (!sale) return <div className="text-center py-12">Invoice not found</div>

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-6 flex justify-between items-center print:hidden">
            <Link to="/sales/history" className="text-primary hover:underline">
              ← Back to Sales
            </Link>
            <button onClick={handlePrint} className="btn btn-primary">
              Print Invoice
            </button>
          </div>

          <div className="card max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">INVOICE</h1>
              <p className="text-gray-600">#{sale.invoice_number}</p>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-semibold mb-2">Invoice Details</h3>
                <p className="text-sm">Date: {new Date(sale.created_at).toLocaleDateString()}</p>
                <p className="text-sm">Status: <span className="font-semibold">{sale.status}</span></p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Customer</h3>
                <p className="text-sm">{sale.customer_name || 'Walk-in Customer'}</p>
              </div>
            </div>

            <table className="table mb-8">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {sale.sale_items?.map((item) => (
                  <tr key={item.id}>
                    <td>{item.products?.name}</td>
                    <td>{item.quantity}</td>
                    <td>{formatCurrency(item.unit_price)}</td>
                    <td>{formatCurrency(item.subtotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="border-t pt-4">
              <div className="space-y-2 text-right max-w-xs ml-auto">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(sale.subtotal)}</span>
                </div>
                {sale.discount_percentage > 0 && (
                  <div className="flex justify-between">
                    <span>Discount ({sale.discount_percentage}%):</span>
                    <span>-{formatCurrency(sale.subtotal * sale.discount_percentage / 100)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>VAT ({sale.vat_percentage}%):</span>
                  <span>{formatCurrency(sale.total_amount - (sale.subtotal - (sale.subtotal * sale.discount_percentage / 100)))}</span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>{formatCurrency(sale.total_amount)}</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default Invoice
