import { useState, useRef, useEffect } from 'react'

const Stepper3Panel = () => {
  const [preview, setPreview] = useState();

  const [image, setImage] = useState();

  const onFileChanged = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const imageRef = useRef(null);

  const onOpenFileDialog = (e) => {
    imageRef.current.click();
  };

  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  return (
    <div className="mb-0 rounded-lg shadow-lg">
    <div className="relative flex justify-center items-center mx-auto">
    { !preview ?
                <div className='max-h-screen pb-20 w-full items-center justify-center bg-white'>

                <div className='mx-10 lg:mx-60'>
                  <div className='text-black text-xl font-semibold pt-10 pb-4 text-center'>Upload Creation</div>
                  <hr className='mx-48 min-[1900px]:mx-[45%] border-indigo-600' />
                  <div className='text-black text-[13px] pt-6 pb-4 pr-10 font-medium'>Ensure the file format is compatible with the chosen smart contract from Step 2 for optimal results.</div>

                  <div className='border-2 border-dashed border-indigo-600 px-3 py-20'>
                    <div className='flex items-center justify-center text-indigo-600'>
                          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center">
                              <div onClick={onOpenFileDialog} className="flex flex-col items-center justify-center py-10 cursor-pointer">
                              <input
                                ref={imageRef}
                                id="image"
                                accept="image/*"
                                type="file"
                                onChange={onFileChanged}
                                style={{ display: "none" }}
                                />
                                  <svg className="w-12 h-12 mb-4 text-indigo-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                  </svg>
                                  <p className="mb-2 text-sm text-indigo-600"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                  <p className="text-xs text-indigo-600 text-center px-10">
                                    <span>JPG, PNG, GIF, WEBP, MP3, WAV, MP4, GLTF, GLB or VOX. Max size 30mb.</span>
                                  </p>
                              </div>
                              <input id="dropzone-file" type="file" className="hidden" />
                          </label>
                    </div>        
                  </div>

                  <div className='w-full text-center items-center justify-center bg-white'>
                        <div className='text-sm text-gray-400  w-full'>
                                <button
                                  disabled
                                  className="cursor-not-allowed group relative inline-block text-sm font-medium text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 my-4 w-full"
                                  >
                                    <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-indigo-600 transition-transform group-hover:translate-y-0 group-hover:translate-x-0 w-full"></span>

                                    <span className="flex items-center justify-center relative block border border-current bg-white py-6 w-full">
                                      Publish
                                    </span>
                                </button>
                        </div>   
                    </div>
                    </div>
                </div>
                :
                <div className='h-screen w-full items-center justify-center bg-white px-10 lg:px-60'>

                <div className='text-black text-2xl font-semibold pt-10 text-center'>Upload Creation</div>
                <div className='text-black font-semibold text-xl text-indigo-600 pt-6 pb-2 text-left'>Preview</div>
                <div className='border-2 border-dashed border-indigo-600 px-3'>
                    <div className='flex justify-center bg-white rounded-xl h-[60%] relative'>
                        <img src={preview} alt="" className='object-cover h-full' />
                    </div>
                </div>
                    <div className='w-full text-center items-center justify-center bg-white'>
                        <div className='text-sm text-gray-400  w-full'>
                            <div>
                                <button
                                  className="cursor-pointer group relative inline-block text-sm font-medium text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 my-4 w-full"
                                  >
                                    <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-indigo-600 transition-transform group-hover:translate-y-0 group-hover:translate-x-0 w-full"></span>

                                    <span className="flex items-center justify-center relative block border border-current bg-white py-6 w-full">
                                      Publish
                                    </span>
                                </button>
                            </div>
                        </div>   
                    </div>
                </div>
                }
    </div>
  </div>
  )
}

export default Stepper3Panel
