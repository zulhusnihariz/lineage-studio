import LoginModal from 'components/LoginModal'
import { useState } from 'react'

const PageIndex = () => {
  return (
    <>
      <section className="bg-white text-black">
        <div className="flex lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="w-full relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-4">
            <img
              alt="Night"
              src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />

            <div className="hidden lg:relative lg:block lg:p-12">
              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">Welcome to Lineage 🦑</h2>

              <p className="mt-4 leading-relaxed text-white/90">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam, quibusdam
                aperiam voluptatum.
              </p>
            </div>
          </section>

          <main className="px-8 py-10 sm:px-12 lg:col-span-7 lg:px-16 xl:col-span-8">
            <div className="w-1/2">
              <h2 className="sm:text-2xl lg:text-4xl font-semibold">Connect wallet</h2>
              <h4 className="sm:text-md lg:text-xl">
                Choose how you want to connect. There are several wallet providers.
              </h4>
            </div>
            <LoginModal />
          </main>
        </div>
      </section>
    </>
  )
}

export default PageIndex
