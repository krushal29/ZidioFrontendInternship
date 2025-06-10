import React from 'react'
import Sidebar from './CustomerSidebar'
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const CustomerDashboard = () => {

  const navigate = useNavigate()

//   useEffect(() => {
//   const token = localStorage.getItem('auth-token');
//   if (!token) {
//     navigate('/login');
//   }
// }, []);


  return (
    <div>
      
      <Sidebar/>
      
    </div>
  )
}

export default CustomerDashboard
