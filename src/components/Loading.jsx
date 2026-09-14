import React from 'react'

function Loading() {
  return (
    <div className='flex h-full w-full items-center justify-center bg-slate-950 text-slate-100'>
      <div className='flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/5 px-8 py-10 shadow-2xl shadow-slate-950/40 backdrop-blur-xl'>
        <div className='h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-sky-400'></div>
        <h1 className='text-2xl font-semibold tracking-tight'>Loading...</h1>
        <p className='text-sm text-slate-400'>Preparing the catalog view</p>
      </div>
    </div>
  )
}

export default Loading
