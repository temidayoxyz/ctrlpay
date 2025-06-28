"use client"

import type React from "react"

interface IPhoneMockupProps {
  children: React.ReactNode
}

export function IPhoneMockup({ children }: IPhoneMockupProps) {
  return (
    <div className="relative">
      {/* iPhone 14 Pro Max Frame */}
      <div className="relative bg-black rounded-[3rem] p-2 shadow-2xl">
        {/* Screen */}
        <div className="bg-black rounded-[2.5rem] p-1">
          {/* Dynamic Island */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50"></div>

          {/* Screen Content */}
          <div className="rounded-[2.25rem] overflow-hidden w-[428px] h-[926px] relative bg-slate-200">{children}</div>
        </div>

        {/* Side Buttons */}
        <div className="absolute left-[-3px] top-[180px] w-1 h-12 bg-gray-800 rounded-l-lg"></div>
        <div className="absolute left-[-3px] top-[220px] w-1 h-16 bg-gray-800 rounded-l-lg"></div>
        <div className="absolute left-[-3px] top-[260px] w-1 h-16 bg-gray-800 rounded-l-lg"></div>
        <div className="absolute right-[-3px] top-[200px] w-1 h-20 bg-gray-800 rounded-r-lg"></div>
      </div>
    </div>
  )
}
