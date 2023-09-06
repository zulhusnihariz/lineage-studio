import { useEffect, useState } from 'react'
import Stepper1Panel from './Stepper1Panel'
import Stepper2Panel from './Stepper2Panel'
import Stepper3Panel from './Stepper3Panel'
import { useBoundStore } from 'store'

const steps = [
  {
    icon: (
      <svg
        className="h-7 w-7 shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
        />
      </svg>
    ),
    title: 'Step 1',
    subtitle: 'Select Your NFT',
  },
  {
    icon: (
      <svg
        className="h-7 w-7 shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Step 2',
    subtitle: 'Choose Meta Contract',
  },
  {
    icon: (
      <svg
        className="h-7 w-7 shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    ),
    title: 'Step 3',
    subtitle: ' Publish your creation',
  },
]

const StepperPanel = (props: { currentIndex: number }) => {
  switch (props.currentIndex) {
    case 0:
      return <Stepper1Panel />
    case 1:
      return <Stepper2Panel />
    case 2:
      return <Stepper3Panel />
  }
}

const Stepper = () => {
  // const [currentIndex, setCurrentIndex] = useState(0)
  const { rpc: rpcStore, setRPCState } = useBoundStore()
  const { stepperIndex: currentIndex } = rpcStore

  /*   useEffect(() => {
    setCurrentIndex(stepperIndex)
  }, [stepperIndex]) */

  function setCurrentIndex(index: number) {
    setRPCState({ stepperIndex: index })
  }

  return (
    <div>
      <ol className="grid grid-cols-1 overflow-hidden text-sm text-gray-500 sm:grid-cols-3 py-2 px-2">
        {steps.map((step, index) => {
          return (
            <li
              key={index}
              className={`${
                currentIndex === index ? 'text-indigo-600' : 'text-white'
              } group relative inline-block text-sm font-medium  focus:outline-none focus:ring cursor-pointer`}
            >
              <span
                className={`${
                  currentIndex === index ? 'bg-indigo-600' : 'text-white'
                } absolute inset-0 translate-x-0.5 translate-y-0.5  transition-transform`}
              ></span>

              <span
                className={`${
                  currentIndex === index ? 'border border-current bg-white' : ''
                } flex items-center relative px-2 lg:px-8 py-3`}
              >
                {step.icon}
                <p className="leading-none ml-2">
                  <strong className="block font-medium">{step.title}</strong>
                  <small className="mt-1">{step.subtitle}</small>
                </p>
              </span>
            </li>
          )
        })}
      </ol>
      <div>
        <StepperPanel currentIndex={parseInt(`${currentIndex}`)} />
      </div>
    </div>
  )
}

export default Stepper
