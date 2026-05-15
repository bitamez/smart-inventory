import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/formatCurrency'

const ProductCard = ({ product }) => {
  const isLowStock = product.quantity <= product.minimum_stock_level

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-500">SKU: {product.sku}</p>
        </div>
        {isLowStock && (
          <span className="bg-danger text-white text-xs px-2 py-1 rounded">
            Low Stock
          </span>
        )}
      </div>
      
      <div className="space-y-2 mb-4">
        <p className="text-2xl font-bold text-primary">
          {formatCurrency(product.price)}
        </p>
        <p className="text-sm">
          Stock: <span className={isLowStock ? 'text-danger font-semibold' : ''}>
            {product.quantity}
          </span>
        </p>
        <p className="text-xs text-gray-500">
          Min Level: {product.minimum_stock_level}
        </p>
      </div>
      
      <Link
        to={`/products/${product.id}`}
        className="btn btn-primary w-full text-center"
      >
        View Details
      </Link>
    </div>
  )
}

export default ProductCard
