import NextButton from 'components/Buttons/NextButton'
import { useBoundStore } from 'store'

const chains = [
  {
    name: 'Ethereum',
    id: 'homestead',
  },
  {
    name: 'Polygon',
    id: 'matic',
  },
  {
    name: 'Celo',
    id: 'celo',
  },
  {
    name: 'Solana',
    id: 'solana',
  },
]

const Stepper1Panel = () => {
  const { setRPCState, rpc: rpcStore } = useBoundStore()
  const { publish } = rpcStore

  function handleInputChange(e: any) {
    const { name, value } = e.target
    setRPCState({ publish: { [name]: value } })
  }

  function handleNextClick(e: any) {
    e.preventDefault()
    setRPCState({ stepperIndex: 1 })
  }

  return (
    <section className="bg-white md:mx-2">
      <div className="lg:grid max-h-screen lg:grid-cols-12">
        <aside className="relative block h-96 lg:order-last lg:col-span-5 lg:h-full xl:col-span-5">
          <div className="bg-indigo-600 relative h-full w-full ">
            <img
              alt="Pattern"
              src="https://images.unsplash.com/photo-1692606742912-b4f9c7102869?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2960&q=80"
              className="relative inset-0 py-10 h-full w-full object-cover"
            />
          </div>
        </aside>

        <main className="flex items-center justify-center px-2 py-10 lg:py-20 sm:px-2 lg:col-span-7 lg:px-2 lg:py-10 xl:col-span-7 lg:mx-10">
          <div className="max-w-xl lg:max-w-3xl w-full text-black">
            <div className="text-md text-center md:text-xl md:px-10 pb-4 font-semibold">Identify your NFT</div>

            <hr className="mx-44 min-[1900px]:mx-[45%] border-indigo-600" />

            <form action="" className="space-y-4 lg:pt-6 pb-10">
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative flex items-center">
                <input
                  name="token_address"
                  type="text"
                  className="w-full border-gray-200 p-3 pe-12 text-sm shadow-sm mr-3"
                  placeholder="Your NFT Token Address (EG : 0x34...)"
                  onChange={handleInputChange}
                  value={publish.token_address}
                />
              </div>

              <div className="relative flex items-center">
                <select
                  name="chain_id"
                  className="w-full border-gray-200 p-3 pe-12 text-sm shadow-sm mr-3"
                  onChange={handleInputChange}
                  value={publish.chain_id}
                >
                  <option value="">Select Chain</option>
                  {chains.map((chain, index) => (
                    <option key={index} value={chain.id}>
                      {chain.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative flex items-center">
                <input
                  name="token_id"
                  type="text"
                  className="w-full border-gray-200 p-3 pe-12 text-sm shadow-sm mr-3"
                  placeholder="Your NFT Token ID (EG : 1445)"
                  onChange={handleInputChange}
                  value={publish.token_id}
                />
              </div>

              <div className="group flex justify-end relative px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.0"
                  stroke="currentColor"
                  className="w-4 h-4 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                  />
                </svg>
                <span
                  className="group-hover:opacity-100 transition-opacity bg-gray-800 p-2 text-[10px] text-gray-100 rounded-md absolute right-0
                    -translate-y-1 z-[100] opacity-0 mx-auto w-full "
                >
                  Select the appropriate blockchain network for your NFT. Input the NFT's specific address and token ID
                  to ensure accurate identification and seamless integration.
                </span>
              </div>

              <div className="flex justify-end text-center">
                <NextButton classNames="bg-red-300 p-3" name="Next" onClick={handleNextClick}></NextButton>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  )
}

export default Stepper1Panel
