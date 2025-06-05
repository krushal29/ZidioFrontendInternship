import React from 'react'
import Sidebar from './CustomerSidebar'
import { useEffect } from 'react';

const CustomerDashboard = () => {

  useEffect(() => {
  const token = localStorage.getItem('auth-token');
  if (!token) {
    navigate('/login');
  }
}, []);


  return (
    <div>
      <Sidebar/>
      
    </div>
  )
}

export default CustomerDashboard
