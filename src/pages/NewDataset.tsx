import AddButton from 'components/Buttons/AddButton'
import NextButton from 'components/Buttons/NextButton'
import Stepper from 'components/Stepper'

const PageNewDataset = () => {
  const onClickBtnFindNFT = (e: any) => {
    e.preventDefault()
  }
  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <div className="block w-3/4">
          <div className="bg-[#181818] rounded p-4">
            <div>
              <Stepper />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageNewDataset
