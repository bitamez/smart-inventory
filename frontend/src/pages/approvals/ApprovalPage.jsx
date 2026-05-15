import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import ApprovalCard from '../../components/ApprovalCard'
import { useFetch } from '../../hooks/useFetch'
import { approvalService } from '../../services/approvalService'
import { useAuth } from '../../hooks/useAuth'

const ApprovalPage = () => {
  const { user } = useAuth()
  const { data: approvals, loading, error, refetch } = useFetch(() => approvalService.getPendingApprovals())
  const [processing, setProcessing] = useState(false)

  const handleApprove = async (approvalId) => {
    setProcessing(true)
    const { error } = await approvalService.approveRequest(approvalId, user.id)
    if (!error) {
      refetch()
    }
    setProcessing(false)
  }

  const handleReject = async (approvalId) => {
    setProcessing(true)
    const { error } = await approvalService.rejectRequest(approvalId, user.id)
    if (!error) {
      refetch()
    }
    setProcessing(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Pending Approvals</h1>

          {loading && <div className="text-center py-12">Loading...</div>}
          {error && <div className="text-red-600 text-center py-12">{error}</div>}
          
          {approvals && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approvals.map((approval) => (
                <ApprovalCard
                  key={approval.id}
                  approval={approval}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))}
            </div>
          )}

          {approvals && approvals.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No pending approvals
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default ApprovalPage
