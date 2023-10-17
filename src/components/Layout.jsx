"use client"
import React from 'react'
import SideBar from './SideBar'
import AppProvider from '@/pages/auth/Context'

export default function Layout({ children }) {
  return (
    <main>
      <section className="h-screen flex">
        <SideBar />
        <div className="w-[100%] max-h-screen overflow-scrollable px-6">
          {children}
        </div>
      </section >
    </main >
  )
}
