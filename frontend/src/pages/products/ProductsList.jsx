import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import ProductCard from '../../components/ProductCard'
import { useFetch } from '../../hooks/useFetch'
import { productService } from '../../services/productService'

const ProductsList = () => {
  const { data: products, loading, error } = useFetch(() => productService.getProducts())

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Products</h1>
            <Link to="/products/add" className="btn btn-primary">
              Add Product
            </Link>
          </div>

          {loading && <div className="text-center py-12">Loading...</div>}
          {error && <div className="text-red-600 text-center py-12">{error}</div>}
          
          {products && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {products && products.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No products found. Add your first product!
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default ProductsList
