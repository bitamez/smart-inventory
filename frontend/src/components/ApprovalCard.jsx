import { formatCurrency } from '../utils/formatCurrency'

const ApprovalCard = ({ approval, onApprove, onReject }) => {
  const sale = approval.sales

  return (
    <div className="card border-l-4 border-warning">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">Invoice #{sale.invoice_number}</h3>
          <p className="text-sm text-gray-500">
            Requested by: {sale.profiles?.full_name}
          </p>
          <p className="text-xs text-gray-400">
            {new Date(approval.created_at).toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">
            {formatCurrency(sale.total_amount)}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm mb-2">Customer: {sale.customer_name || 'Walk-in'}</p>
        <p className="text-sm">Items: {sale.sale_items?.length || 0}</p>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => onApprove(approval.id)}
          className="btn btn-success flex-1"
        >
          Approve
        </button>
        <button
          onClick={() => onReject(approval.id)}
          className="btn btn-danger flex-1"
        >
          Reject
        </button>
      </div>
    </div>
  )
}

export default ApprovalCard
