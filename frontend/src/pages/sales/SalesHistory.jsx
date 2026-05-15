import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import SalesTable from '../../components/SalesTable'
import { useFetch } from '../../hooks/useFetch'
import { salesService } from '../../services/salesService'

const SalesHistory = () => {
  const { data: sales, loading, error } = useFetch(() => salesService.getSales())

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Sales History</h1>

          <div className="card">
            {loading && <div className="text-center py-12">Loading...</div>}
            {error && <div className="text-red-600 text-center py-12">{error}</div>}
            {sales && <SalesTable sales={sales} />}
            {sales && sales.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No sales found
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default SalesHistory
