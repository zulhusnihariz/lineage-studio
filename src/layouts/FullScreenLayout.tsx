import { Outlet } from 'react-router-dom'
import { Web3Wrapper } from 'App'

const FullScreenLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Web3Wrapper>
      <div className="text-white pb-[100px]">
        <Outlet />
      </div>
    </Web3Wrapper>
  )
}

export default FullScreenLayout
