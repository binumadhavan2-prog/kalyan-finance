import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/Home'
import LoanProducts from './pages/LoanProducts'
import About from './pages/About'
import WhyUs from './pages/WhyUs'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="loan-products" element={<LoanProducts />} />
          <Route path="about" element={<About />} />
          <Route path="why-us" element={<WhyUs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}
