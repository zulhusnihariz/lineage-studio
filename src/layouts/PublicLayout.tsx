import { IpfsProvider } from 'hooks/use-ipfs'
import { Outlet } from 'react-router-dom'

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <IpfsProvider>
      <div className="container mx-auto text-white pb-[100px]">
        <Outlet />
      </div>
    </IpfsProvider>
  )
}

export default PublicLayout
