import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import { productService } from '../../services/productService'
import { salesService } from '../../services/salesService'
import { useAuth } from '../../hooks/useAuth'
import { formatCurrency } from '../../utils/formatCurrency'
import { calculateTotalWithVAT } from '../../utils/calculateVAT'
import { calculateTotalAfterDiscount } from '../../utils/calculateDiscount'

const NewSale = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [vatSettings, setVatSettings] = useState(null)
  const [saleItems, setSaleItems] = useState([])
  const [customerName, setCustomerName] = useState('')
  const [discount, setDiscount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const [productsRes, vatRes] = await Promise.all([
      productService.getProducts(),
      salesService.getVATSettings()
    ])
    if (productsRes.data) setProducts(productsRes.data)
    if (vatRes.data) setVatSettings(vatRes.data)
  }

  const addItem = () => {
    setSaleItems([...saleItems, { product_id: '', quantity: 1, unit_price: 0 }])
  }

  const removeItem = (index) => {
    setSaleItems(saleItems.filter((_, i) => i !== index))
  }

  const updateItem = (index, field, value) => {
    const updated = [...saleItems]
    updated[index][field] = value
    
    if (field === 'product_id') {
      const product = products.find(p => p.id === value)
      if (product) {
        updated[index].unit_price = product.price
      }
    }
    
    setSaleItems(updated)
  }

  const calculateSubtotal = () => {
    return saleItems.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0)
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const afterDiscount = calculateTotalAfterDiscount(subtotal, discount)
    return calculateTotalWithVAT(afterDiscount, vatSettings?.vat_percentage || 0)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const total = calculateTotal()
    const invoiceNumber = `INV-${Date.now()}`

    const saleData = {
      invoice_number: invoiceNumber,
      customer_name: customerName || null,
      subtotal: calculateSubtotal(),
      discount_percentage: discount,
      vat_percentage: vatSettings?.vat_percentage || 0,
      total_amount: total,
      status: total > 50000 ? 'pending' : 'completed',
      created_by: user.id
    }

    const { data: sale, error: saleError } = await salesService.createSale(saleData)
    
    if (saleError) {
      setError(saleError)
      setLoading(false)
      return
    }

    const items = saleItems.map(item => ({
      sale_id: sale.id,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      subtotal: item.unit_price * item.quantity
    }))

    const { error: itemsError } = await salesService.createSaleItems(items)
    
    if (itemsError) {
      setError(itemsError)
      setLoading(false)
    } else {
      navigate(`/sales/invoice/${sale.id}`)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">New Sale</h1>

          <div className="card max-w-4xl">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">Customer Name (Optional)</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="input"
                  placeholder="Walk-in customer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Items</h3>
                  <button
                    type="button"
                    onClick={addItem}
                    className="btn btn-primary text-sm"
                  >
                    Add Item
                  </button>
                </div>

                {saleItems.map((item, index) => (
                  <div key={index} className="flex gap-4 mb-4">
                    <select
                      value={item.product_id}
                      onChange={(e) => updateItem(index, 'product_id', e.target.value)}
                      className="input flex-1"
                      required
                    >
                      <option value="">Select Product</option>
                      {products.map(product => (
                        <option key={product.id} value={product.id}>
                          {product.name} - {formatCurrency(product.price)}
                        </option>
                      ))}
                    </select>

                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                      className="input w-24"
                      min="1"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="btn btn-danger"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Discount (%)</label>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(parseFloat(e.target.value))}
                  className="input w-32"
                  min="0"
                  max="100"
                  step="0.01"
                />
              </div>

              <div className="border-t pt-4">
                <div className="space-y-2 text-right">
                  <p>Subtotal: {formatCurrency(calculateSubtotal())}</p>
                  <p>Discount ({discount}%): -{formatCurrency(calculateSubtotal() * discount / 100)}</p>
                  <p>VAT ({vatSettings?.vat_percentage || 0}%): {formatCurrency(calculateTotal() - calculateTotalAfterDiscount(calculateSubtotal(), discount))}</p>
                  <p className="text-2xl font-bold">Total: {formatCurrency(calculateTotal())}</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || saleItems.length === 0}
                className="btn btn-success w-full"
              >
                {loading ? 'Processing...' : 'Complete Sale'}
              </button>
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default NewSale
