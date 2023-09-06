import GenericModal from 'components/Modal/GenericModal'
import { useWeb3Auth } from 'hooks/use-web3auth'
import { useState, useRef, useEffect } from 'react'
import { usePublishTransaction, useStoreBlob } from 'repositories/rpc.repository'
import { Transaction } from 'services/rpc'
import { useBoundStore } from 'store'
import { useAccount, useSignMessage } from 'wagmi'
import { LoadingSpinner } from 'components/Icons/icons'

const Stepper3Panel = () => {
  const [image, setImage] = useState<File | null>(null)
  const imageRef = useRef<HTMLInputElement>(null)

  const { rpc: rpcStore, modal, setRPCState, setModalState } = useBoundStore()
  const { publish: tx } = rpcStore
  const { publishTxModal } = modal

  const { address } = useAccount()
  const { mutateAsync: storeBlob } = useStoreBlob()
  const { mutateAsync: publishTx } = usePublishTransaction()
  const { signMessage: signMessageWeb3Auth, isConnected } = useWeb3Auth()

  const { signMessageAsync } = useSignMessage({
    async onSuccess(signature) {
      setRPCState({ publish: { signature } })
      await publishTx(tx as Transaction)
      setModalState({ publishTxModal: { isOpen: false, isLoading: false, message: 'Published!' } })
    },
  })

  const onFileChanged = (e: any) => {
    setImage(e.target.files[0])
  }

  const onOpenFileDialog = (e: any) => {
    if (imageRef?.current) imageRef.current.click()
  }

  async function onClickPublish() {
    setModalState({ publishTxModal: { isOpen: true, isLoading: true, message: 'Uploading image to IPFS' } })
    const url = await storeBlob(new Blob([image as File]))
    setModalState({ publishTxModal: { message: 'Sign message to proceed' } })
    setRPCState({ publish: { public_key: address, data: url } })
    await signMessageAsync({ message: url })
  }

  return (
    <div className="mb-0 rounded-lg shadow-lg md:mx-2">
      {/* <GenericModal isOpen={Boolean(publishTxModal?.isOpen)} message={`${publishTxModal.message}`} onClose={() => {}} /> */}
      <div className="relative flex flex-col justify-center items-center mx-auto bg-white pb-5">
        {!image ? (
          <div className="max-h-screen pb-2 w-full items-center justify-center text-center bg-white">
            <div className="mx-10 lg:mx-60">
              <div className="text-black text-xl font-semibold pt-10 pb-4 text-center">Upload Creation</div>
              <hr className="mx-48 min-[1900px]:mx-[45%] border-indigo-600" />
              <div className="text-gray-400 text-sm pt-6 pb-4 pr-10 font-medium">
                Ensure the file format is compatible with the chosen smart contract from Step 2 for optimal results.
              </div>

              <div className="relative flex cursor-pointer px-5 py-4 shadow-md focus:outline-none`">
                <div className="flex items-center justify-center text-indigo-600 border-2 border-dashed border-indigo-600 p-1">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center">
                    <div
                      onClick={onOpenFileDialog}
                      className="flex flex-col items-center justify-center py-10 cursor-pointer"
                    >
                      <input
                        ref={imageRef}
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={e => {
                          onFileChanged(e)
                        }}
                        style={{ display: 'none' }}
                      />
                      <svg
                        className="w-12 h-12 mb-4 text-indigo-600"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-indigo-600">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-indigo-600 text-center px-10">
                        <span>JPG, PNG, GIF, WEBP, MP3, WAV, MP4, GLTF, GLB or VOX. Max size 30mb.</span>
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-h-screen w-full items-center justify-center bg-white px-10 lg:px-60">
            <div className="text-black text-2xl font-semibold pt-10 text-center">Upload Creation</div>
            <div className="font-semibold text-xl text-indigo-600 pt-6 pb-2 text-left">Preview</div>
            <div className="border-2 border-dashed border-indigo-600 px-3">
              <div className="flex justify-center bg-white rounded-xl h-[60%] relative">
                <img src={URL.createObjectURL(image)} alt="" className="object-contain h-full" />
              </div>
            </div>
          </div>
        )}

        <div className="text-center items-center justify-center text-sm text-gray-400 mt-5 mx-auto">
          <div>
            <button
              disabled={publishTxModal.isLoading}
              className={`${
                publishTxModal.isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
              } className="group relative inline-block text-sm font-medium text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"`}
            >
              <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-indigo-600 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>

              <div
                onClick={onClickPublish}
                className="flex items-center relative block border border-current bg-white px-8 py-3"
              >
                {publishTxModal.isLoading ? <LoadingSpinner className="text-indigo-600" /> : 'Publish'}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stepper3Panel
