import { RadioGroup } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { MetaContract } from 'services/rpc'
import { useBoundStore } from 'store'

const contracts = [
  {
    token_key: '',
    meta_contract_id: '7e432bcd-0ca5-4f6d-8c63-2c9474ca1676',
    public_key: 'a',
    type: 'Random',
  },
  {
    token_key: '',
    meta_contract_id: 'cfcb1bd4-4931-11ee-be56-0242ac120002',
    public_key: 'a',
    type: 'Image',
  },
  {
    token_key: '',
    meta_contract_id: 'cfcb1bd4-4931-11ee-be56-0242ac120002',
    public_key: 'a',
    type: 'Metadata',
  },
  {
    token_key: '',
    meta_contract_id: 'cfcb1bd4-4931-11ee-be56-0242ac120002',
    public_key: 'a',
    type: 'Video',
  },
  {
    token_key: '',
    meta_contract_id: 'cfcb1bd4-4931-11ee-be56-0242ac120002',
    public_key: 'a',
    type: '2D Spritesheet',
  },
  {
    token_key: '',
    meta_contract_id: 'cfcb1bd4-4931-11ee-be56-0242ac120002',
    public_key: 'a',
    type: 'Podcast',
  },
  {
    token_key: '',
    meta_contract_id: 'cfcb1bd4-4931-11ee-be56-0242ac120002',
    public_key: 'a',
    type: 'Collabeat',
  },
]

const CheckIcon = (props: any) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const Stepper2Panel = () => {
  const [selected, setSelected] = useState(contracts[0])

  const { setRPCState, rpc: rpcStore } = useBoundStore()
  const { publish } = rpcStore

  function handleInputChange(e: any) {
    const { name, value } = e.target
    setRPCState({ publish: { [name]: value } })
  }

  useEffect(() => {
    if (selected) setRPCState({ publish: { meta_contract_id: selected.meta_contract_id } })
  }, [selected])

  function handleNextClick(e: any) {
    e.preventDefault()
    setRPCState({ stepperIndex: 1 })
  }

  return (
    <div className="md:mx-2 mb-0 space-y-4 p-4 shadow-lg sm:p-6 lg:px-10 lg:py-10 bg-white">
      <div className="text-black font-semibold text-xl text-center">Meta Contract Selection</div>

      <hr className="mx-52 lg:mx-96 min-[1900px]:mx-[45%] border-indigo-600" />

      <div className="relative flex items-center text-black w-3/4 mx-auto pt-6">
        <input
          name="meta_contract_id"
          type="text"
          className="w-full border-gray-200 p-3 pe-12 text-sm shadow-sm mr-3 z-10"
          placeholder="Meta Contract ID"
          onChange={handleInputChange}
          value={publish.meta_contract_id}
        />
        <div className="group flex relative px-3 text-black justify-end z-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.0"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
            />
          </svg>
          <span
            className="group-hover:opacity-100 transition-opacity bg-gray-800 p-2 text-[10px] text-gray-100 rounded-md absolute -right-28 w-60
              translate-y-2 opacity-0 m-4"
          >
            Pick a relevant contract that matches the type of media you're about to upload. For instance, if uploading
            an image, choose the "Image Meta Contract" to ensure proper validation and compatibility.
          </span>
        </div>
      </div>

      <div className="mt-4 pt-6 pb-20">
        <RadioGroup value={selected} onChange={setSelected} className="">
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="grid grid-cols-3 gap-4">
            {contracts.map((contract, index) => (
              <RadioGroup.Option
                key={contract.meta_contract_id}
                value={contract}
                className={({ active, checked }) =>
                  `${active ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300' : ''}
              ${checked ? 'bg-indigo-600 bg-opacity-75 text-white' : 'bg-white'}
                relative flex cursor-pointer px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-semibold  ${checked ? 'text-white' : 'text-gray-900'}`}
                          >
                            {contract.type}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${checked ? 'text-sky-100' : 'text-gray-500'}`}
                          >
                            <span className="text-xs">{contract.meta_contract_id}</span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

export default Stepper2Panel
