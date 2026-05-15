import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import { useFetch } from '../../hooks/useFetch'
import { stockService } from '../../services/stockService'

const StockHistory = () => {
  const { data: transactions, loading, error } = useFetch(() => stockService.getStockTransactions())

  const getTypeColor = (type) => {
    switch (type) {
      case 'stock_in':
        return 'bg-success text-white'
      case 'stock_out':
        return 'bg-danger text-white'
      case 'adjustment':
        return 'bg-warning text-white'
      default:
        return 'bg-gray-200 text-gray-700'
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Stock History</h1>

          <div className="card">
            {loading && <div className="text-center py-12">Loading...</div>}
            {error && <div className="text-red-600 text-center py-12">{error}</div>}
            
            {transactions && (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Product</th>
                      <th>Type</th>
                      <th>Quantity</th>
                      <th>Notes</th>
                      <th>By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td>{new Date(transaction.created_at).toLocaleString()}</td>
                        <td>{transaction.products?.name}</td>
                        <td>
                          <span className={`text-xs px-2 py-1 rounded ${getTypeColor(transaction.transaction_type)}`}>
                            {transaction.transaction_type}
                          </span>
                        </td>
                        <td className="font-semibold">{transaction.quantity}</td>
                        <td className="text-sm">{transaction.notes || '-'}</td>
                        <td className="text-sm">{transaction.profiles?.full_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {transactions && transactions.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No stock transactions found
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default StockHistory
