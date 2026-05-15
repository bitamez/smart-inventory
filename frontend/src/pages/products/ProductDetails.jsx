import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import { productService } from '../../services/productService'
import { formatCurrency } from '../../utils/formatCurrency'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    const { data, error } = await productService.getProduct(id)
    if (data) {
      setProduct(data)
    } else if (error) {
      setError(error)
    }
    setLoading(false)
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const { error } = await productService.deleteProduct(id)
      if (error) {
        setError(error)
      } else {
        navigate('/products')
      }
    }
  }

  if (loading) return <div className="text-center py-12">Loading...</div>
  if (error) return <div className="text-red-600 text-center py-12">{error}</div>
  if (!product) return <div className="text-center py-12">Product not found</div>

  const isLowStock = product.quantity <= product.minimum_stock_level

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <Link to="/products" className="text-primary hover:underline">
              ← Back to Products
            </Link>
          </div>

          <div className="card max-w-3xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-gray-500">SKU: {product.sku}</p>
              </div>
              {isLowStock && (
                <span className="bg-danger text-white px-3 py-1 rounded">
                  Low Stock
                </span>
              )}
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm text-gray-500">Description</label>
                <p>{product.description || 'No description'}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Price</label>
                  <p className="text-xl font-bold text-primary">
                    {formatCurrency(product.price)}
                  </p>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Stock Quantity</label>
                  <p className={`text-xl font-bold ${isLowStock ? 'text-danger' : ''}`}>
                    {product.quantity}
                  </p>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Min Stock Level</label>
                  <p className="text-xl font-bold">{product.minimum_stock_level}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Created</label>
                  <p className="text-sm">
                    {new Date(product.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Link
                to={`/products/edit/${product.id}`}
                className="btn btn-primary"
              >
                Edit Product
              </Link>
              <button
                onClick={handleDelete}
                className="btn btn-danger"
              >
                Delete Product
              </button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default ProductDetails
