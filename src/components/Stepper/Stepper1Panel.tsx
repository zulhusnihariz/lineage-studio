import NextButton from 'components/Buttons/NextButton'

const chains = [
  {
    name: 'Ethereum',
    id: 'eth',
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
    id: 'sol',
  },
]

const Stepper1Panel = () => {
  return (
    <div className="flex">
      <form action="" className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 w-3/4 mx-auto">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <div className="relative flex items-center">
          <input
            type="text"
            className="w-full border-gray-200 p-3 pe-12 text-sm shadow-sm mr-3"
            placeholder="Token Address"
          />
        </div>
        <div className="relative flex items-center">
          <select className="w-full border-gray-200 p-3 pe-12 text-sm shadow-sm mr-3">
            <option value="">Please select</option>
            {chains.map((chain, index) => (
              <option key={index} value={chain.id}>
                {chain.name}
              </option>
            ))}
          </select>
        </div>
        <div className="relative flex items-center">
          <input
            type="text"
            className="w-full border-gray-200 p-3 pe-12 text-sm shadow-sm mr-3"
            placeholder="Token Id"
          />
        </div>
        <div className="text-center">
          <NextButton classNames="bg-red-300 p-3" name="Next" onClick={e => {}}></NextButton>
        </div>
      </form>
      <div>asd</div>
    </div>
  )
}

export default Stepper1Panel
