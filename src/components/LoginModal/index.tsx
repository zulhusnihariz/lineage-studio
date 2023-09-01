import ConnectSolana from 'components/Connect/ConnectSolana'
import ConnectNear from 'components/Connect/ConnectNear'
import ConnectWallet from 'components/Connect/ConnectWallet'
import { Tab } from '@headlessui/react'
import { arbitrum, bsc, celo, mainnet, polygon } from 'wagmi/chains'
import { useConnectedWallet } from 'hooks/use-connected-wallet'
import { CURRENT_CHAIN } from 'store/slices/wallet.slice'

function classNames(...classes: String[]) {
  return classes.filter(Boolean).join(' ')
}

const chains = [
  {
    name: 'Ethereum',
    networkId: CURRENT_CHAIN.ETHEREUM,
    chain: mainnet,
    svg: (
      <span role="img" aria-label="Ethereum Logo" className="icon-32">
        <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16">
          <path
            fill="#ffffff"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.3688 8.81011L7.68341 14L4 8.81011L7.68341 10.985L11.3688 8.81011ZM7.68341 2L11.3668 8.11174L7.68341 10.2887L4 8.11174L7.68341 2Z"
          ></path>
        </svg>
      </span>
    ),
    wallet: 'evm',
  },
  {
    name: 'Polygon',
    networkId: CURRENT_CHAIN.POLYGON,
    chain: polygon,
    svg: (
      <span role="img" aria-label="Polygon Logo" className="icon-32">
        <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16">
          <path
            fill="#ffffff"
            d="M11.3944 10.7329L14.7152 8.81544C14.8912 8.71358 15 8.52468 15 8.32196V4.48698C15 4.28426 14.8912 4.09538 14.7152 3.99351L11.3944 2.07602C11.2184 1.97417 10.9999 1.97516 10.8248 2.07602L7.50404 3.99351C7.32805 4.09538 7.21925 4.28426 7.21925 4.48698V11.3401L4.89037 12.684L2.56149 11.3401V8.6513L4.89037 7.30737L6.42617 8.19438V6.39062L5.17515 5.66774C5.08911 5.61829 4.99027 5.59159 4.89037 5.59159C4.79046 5.59159 4.69162 5.61829 4.60558 5.66774L1.28481 7.58523C1.10878 7.68709 1 7.876 1 8.07871V11.9137C1 12.1164 1.10878 12.3053 1.28481 12.4071L4.60558 14.3247C4.78157 14.4255 4.99916 14.4255 5.17515 14.3247L8.49593 12.4071C8.67198 12.3053 8.78071 12.1164 8.78071 11.9137V5.05956L8.82225 5.03582L11.1086 3.71563L13.4375 5.05956V7.74842L11.1086 9.09235L9.57481 8.20724V10.0111L10.8238 10.732C10.9999 10.8328 11.2184 10.8328 11.3934 10.732L11.3944 10.7329Z"
          ></path>
        </svg>
      </span>
    ),
    wallet: 'evm',
  },
  {
    name: 'BNB',
    networkId: CURRENT_CHAIN.BINANCE,
    chain: bsc,
    svg: (
      <span role="img" aria-label="BNB Logo" className="icon-32">
        <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16">
          <path
            fill="#ffffff"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.38097 12.6321V14.2143L8.01698 15L6.65299 14.2143V12.6321L8.01698 13.4178L9.38097 12.6321ZM1.96086 7.2198L3.32485 8.00546V10.7116L5.68183 12.0756V13.6578L1.96086 11.5082V7.2198ZM14.084 7.20889V11.4973L10.363 13.6469V12.0647L12.7091 10.7116V8.00546L14.084 7.20889ZM10.374 5.07015L11.7379 5.85581V7.43804L9.38097 8.79111V11.4973L8.01698 12.2829L6.65299 11.4973V8.79111L4.30693 7.43804V5.85581L5.67092 5.07015L8.01698 6.42323L10.374 5.07015ZM11.727 8.56196V10.1551L10.363 10.9408V9.34762L11.727 8.56196ZM4.30693 8.57288L5.67092 9.35853V10.9408L4.30693 10.1551V8.57288ZM12.7091 3.70616L14.0731 4.50273V6.08496L12.7091 6.87062V5.28839L11.3451 4.49182L12.7091 3.70616ZM3.32485 3.70616L4.67793 4.50273L3.31394 5.28839V6.87062L1.94995 6.08496H1.96086V4.49182L3.32485 3.70616ZM8.01698 3.70616L9.38097 4.50273L8.01698 5.28839L6.65299 4.50273L8.01698 3.70616ZM8.01698 1L11.7379 3.14965L10.374 3.93531L8.01698 2.58223L5.67092 3.93531L4.30693 3.14965L8.01698 1Z"
          ></path>
        </svg>
      </span>
    ),
    wallet: 'evm',
  },
  {
    name: 'Arbitrum',
    networkId: CURRENT_CHAIN.ARBITRUM,
    chain: arbitrum,
    svg: (
      <span role="img" aria-label="Arbitrum Logo" className="icon-32">
        <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16">
          <path
            fill="#ffffff"
            d="M14.3342 3.45141L8.66552 0.178249C8.25367 -0.0594164 7.74633 -0.0594164 7.33448 0.178249L1.66527 3.45141C1.25364 3.68918 1 4.12843 1 4.6038V11.9184L1.01464 11.9272L2.64927 12.8706L3.17592 13.1747L4.93648 14.1914L7.33448 15.5757C7.74633 15.8133 8.25367 15.8133 8.66552 15.5757L14.3342 12.3025C14.7461 12.0649 15 11.6256 15 11.1501V4.6038C15 4.1283 14.7461 3.68898 14.3342 3.45141ZM14.0692 10.603L10.9674 5.33155L9.78569 7.342L12.6435 12.2024L12.1124 12.5095L9.40791 7.97994L8.23307 9.97723L10.3519 13.5257L8.25796 14.7347C8.09836 14.8269 7.90164 14.8269 7.74204 14.7347L5.41383 13.3905L10.6506 4.62283H8.28334L3.65328 12.3757L3.12126 12.0687L7.50092 4.62283H6.17087C5.52866 4.62295 4.93448 4.96294 4.60897 5.51653L1.9308 10.068V4.67115C1.93064 4.48678 2.02889 4.31633 2.18851 4.22406L7.74204 1.01777C7.90164 0.925511 8.09836 0.925511 8.25796 1.01777L13.811 4.22406C13.9707 4.31628 14.0692 4.48671 14.0692 4.67115V10.603Z"
          ></path>
        </svg>
      </span>
    ),
    wallet: 'evm',
  },
  {
    name: 'Celo',
    networkId: CURRENT_CHAIN.CELO,
    chain: celo,
    svg: (
      <span role="img" aria-label="Celo Logo" className="icon-32">
        <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16">
          <path
            fill="#ffffff"
            d="M15 1H1V15H15V10.1128H12.6752C11.8747 11.8966 10.0726 13.1358 8.01097 13.1358C5.1671 13.1358 2.86423 10.811 2.86423 7.98903C2.86057 5.1671 5.1671 2.86423 8.01097 2.86423C10.1128 2.86423 11.9149 4.1436 12.7154 5.96762H15V1Z"
          ></path>
        </svg>
      </span>
    ),
    wallet: 'evm',
  },
  {
    name: 'Solana',
    networkId: CURRENT_CHAIN.SOLANA,
    chain: null,
    svg: (
      <span role="img" aria-label="Solana Logo" className="icon-32">
        <svg viewBox="0 0 128 128">
          <path
            fill="#ffffff"
            d="M93.94 42.63H13.78l20.28-20.22h80.16L93.94 42.63zM93.94 105.59H13.78l20.28-20.21h80.16M34.06 74.11h80.16L93.94 53.89H13.78"
          ></path>
        </svg>
      </span>
    ),
    wallet: 'solana',
  },
  {
    name: 'Near',
    networkId: CURRENT_CHAIN.NEAR,
    chain: null,
    svg: (
      <span role="img" aria-label="NEAR Logo" className="icon-32">
        <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16">
          <path
            fill="#ffffff"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.5652 2.64635L9.07421 6.34483C9.00084 6.45498 9.02005 6.60237 9.11919 6.69004C9.21834 6.7777 9.36698 6.77872 9.46731 6.69242L11.9194 4.56552C11.9488 4.53925 11.9909 4.53282 12.0268 4.54914C12.0627 4.56546 12.0855 4.60143 12.085 4.64083V11.2996C12.0849 11.3413 12.0588 11.3786 12.0196 11.3929C11.9803 11.4072 11.9363 11.3953 11.9095 11.3633L4.49766 2.49076C4.25636 2.20583 3.90193 2.04138 3.52855 2.04138H3.26952C2.56838 2.04138 2 2.60976 2 3.3109V12.6891C2 13.3902 2.56838 13.9586 3.26952 13.9586C3.71095 13.9586 4.12079 13.7297 4.352 13.3537L6.84303 9.65518C6.9164 9.54503 6.89719 9.39763 6.79805 9.30997C6.6989 9.2223 6.55026 9.22129 6.44993 9.30759L3.99779 11.4345C3.96843 11.4608 3.92631 11.4672 3.89045 11.4509C3.85459 11.4345 3.83176 11.3986 3.83228 11.3592V4.69876C3.83229 4.657 3.85843 4.61971 3.89768 4.60545C3.93693 4.5912 3.98091 4.60302 4.00772 4.63504L11.4188 13.5092C11.6601 13.7942 12.0145 13.9586 12.3879 13.9586H12.6469C12.9837 13.9588 13.3069 13.8252 13.5451 13.5871C13.7834 13.349 13.9172 13.0259 13.9172 12.6891V3.3109C13.9172 2.60976 13.3489 2.04138 12.6477 2.04138C12.2063 2.04138 11.7965 2.27031 11.5652 2.64635Z"
          ></path>
        </svg>
      </span>
    ),
    wallet: 'near',
  },
]

const WalletConnector = (prop: { type: String; networkId: CURRENT_CHAIN; chainId: number }) => {
  switch (prop.type) {
    case 'evm':
      return <ConnectWallet chain={prop.networkId} chainId={prop.chainId ?? 0} />
    case 'solana':
      return <ConnectSolana />
    case 'near':
      return <ConnectNear />
  }
}

const LoginModal = () => {
  useConnectedWallet()

  return (
    <div className="w-full text-black px-2 py-8 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900 p-1">
          {chains.map((chain, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg px-4 py-2.5 text-sm font-medium leading-5 text-white',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected ? 'bg-blue-300 shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              <div className="flex items-center">
                {chain.svg}
                {chain.name}
              </div>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {chains.map((chain, index) => (
            <Tab.Panel key={index}>
              <WalletConnector type={chain.wallet} networkId={chain.networkId} chainId={chain.chain?.id ?? 0} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default LoginModal
