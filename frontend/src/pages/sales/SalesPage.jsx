import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'

const SalesPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Sales</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/sales/new" className="card hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">New Sale</h2>
              <p className="text-gray-600">Create a new sales transaction</p>
            </Link>

            <Link to="/sales/history" className="card hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">Sales History</h2>
              <p className="text-gray-600">View all sales transactions</p>
            </Link>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default SalesPage
