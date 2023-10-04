import { useEffect, useState } from 'react'
import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask'
import { PhantomConnector } from 'phantom-wagmi-connector'
import { bsc, bscTestnet, goerli, mainnet, polygon, polygonMumbai } from 'wagmi/chains'
import { createConfig, configureChains, WagmiConfig } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import MainLayout from 'layouts/MainLayout'
import './App.css'
// Hook
import { IpfsProvider } from 'hooks/use-ipfs'
import { AlertMessageProvider } from 'hooks/use-alert-message'

// Router
import { Route, Routes } from 'react-router-dom'

import PageIndex from 'pages'
import PageInventory from 'pages/PageInventory'
import { ApiProvider } from 'hooks/use-api'
import SignInModal from 'components/Modal/SignInModal'
import PublicLayout from 'layouts/PublicLayout'
import FullScreenLayout from 'layouts/FullScreenLayout'
import { Web3AuthProvider } from 'hooks/use-web3auth'
import PageDashboard from 'pages/PageDashboard'
import PageNewDataset from 'pages/NewDataset'

const App = () => {
  return (
    <Web3AuthProvider>
      <ApiProvider>
        <Routes>
          <Route element={<FullScreenLayout children={undefined} />}>
            <Route path="/" element={<PageIndex />} />
          </Route>
          <Route element={<MainLayout children={undefined} />}>
            <Route path="/dashboard" element={<PageDashboard />} />
            <Route path="/dashboard/new/data" element={<PageNewDataset />} />
            <Route path="/inventory" element={<PageInventory />} />
          </Route>
          <Route element={<PublicLayout children={undefined} />}></Route>
        </Routes>
      </ApiProvider>
    </Web3AuthProvider>
  )
}

const currentChain = [
  // mainnet
  mainnet,
  polygon,
  bsc,
  // tesnet
  goerli,
  polygonMumbai,
  bscTestnet,
]

// Web3 Configs
const { chains, publicClient } = configureChains(currentChain, [
  infuraProvider({ apiKey: String(import.meta.env.VITE_INFURA_ID) }),
  jsonRpcProvider({
    rpc: chain => {
      return {
        http: `${chain.rpcUrls.default}`,
      }
    },
  }),
  publicProvider(),
])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains }), new PhantomConnector({ chains })],
  publicClient,
})

export function Web3Wrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <WagmiConfig config={wagmiConfig}>
      <IpfsProvider>
        <AlertMessageProvider>{children}</AlertMessageProvider>
      </IpfsProvider>
      <SignInModal />
    </WagmiConfig>
  )
}

export default App
