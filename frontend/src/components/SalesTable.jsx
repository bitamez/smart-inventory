import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/formatCurrency'

const SalesTable = ({ sales }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-white'
      case 'pending':
        return 'bg-warning text-white'
      case 'cancelled':
        return 'bg-danger text-white'
      default:
        return 'bg-gray-200 text-gray-700'
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Invoice #</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sales?.map((sale) => (
            <tr key={sale.id}>
              <td className="font-mono">{sale.invoice_number}</td>
              <td>{new Date(sale.created_at).toLocaleDateString()}</td>
              <td>{sale.customer_name || 'Walk-in'}</td>
              <td className="font-semibold">{formatCurrency(sale.total_amount)}</td>
              <td>
                <span className={`text-xs px-2 py-1 rounded ${getStatusColor(sale.status)}`}>
                  {sale.status}
                </span>
              </td>
              <td>
                <Link
                  to={`/sales/invoice/${sale.id}`}
                  className="text-primary hover:underline text-sm"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SalesTable
