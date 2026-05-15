import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import ReportCard from '../../components/ReportCard'
import { productService } from '../../services/productService'
import { salesService } from '../../services/salesService'
import { formatCurrency } from '../../utils/formatCurrency'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStockProducts: 0,
    todaySales: 0,
    totalRevenue: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    const [productsRes, lowStockRes, salesRes] = await Promise.all([
      productService.getProducts(),
      productService.getLowStockProducts(),
      salesService.getSales()
    ])

    const todaySales = salesRes.data?.filter(sale => {
      const saleDate = new Date(sale.created_at).toDateString()
      return saleDate === new Date().toDateString()
    }) || []

    const totalRevenue = salesRes.data?.reduce((sum, sale) => 
      sale.status === 'completed' ? sum + sale.total_amount : sum, 0
    ) || 0

    setStats({
      totalProducts: productsRes.data?.length || 0,
      lowStockProducts: lowStockRes.data?.length || 0,
      todaySales: todaySales.length,
      totalRevenue
    })
    setLoading(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ReportCard
                title="Total Products"
                value={stats.totalProducts}
                color="primary"
              />
              <ReportCard
                title="Low Stock Items"
                value={stats.lowStockProducts}
                color="danger"
              />
              <ReportCard
                title="Today's Sales"
                value={stats.todaySales}
                color="success"
              />
              <ReportCard
                title="Total Revenue"
                value={formatCurrency(stats.totalRevenue)}
                color="primary"
              />
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard
