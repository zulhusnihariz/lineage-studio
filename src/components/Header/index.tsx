import React from 'react'
import { Disclosure, Switch } from '@headlessui/react'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import logo from 'assets/img/logo.svg'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useConnectedWallet } from 'hooks/use-connected-wallet'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { shortenAddress } from 'utils'
import { useQueryClient } from '@tanstack/react-query'
import { useBoundStore } from 'store'

function EditActiveIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 13V16H7L16 7L13 4L4 13Z" fill="#8B5CF6" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  )
}

function SignoutIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
        clipRule="evenodd"
        fill="#8B5CF6"
        stroke="#C4B5FD"
      />
    </svg>
  )
}

export default function Header() {
  useConnectedWallet()

  const navigate = useNavigate()

  const [enabled, setEnabled] = useState(false)
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const queryClient = useQueryClient()
  const { resetAllSlices } = useBoundStore()

  async function onClickSignout() {
    resetAllSlices()
    await queryClient.resetQueries()
    disconnect()
    navigate('/')
  }

  return (
    <Disclosure as="nav" className="bg-transparent">
      <div className="mx-auto max-w-[3840px] py-5">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link to="/">
                <img className="block h-10 w-auto lg:hidden" src={logo} alt="Collabeat" />
                <img className="hidden h-10 w-auto lg:block" src={logo} alt="Collabeat" />
              </Link>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center gap-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            Devnet{' '}
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className={`${enabled ? 'bg-teal-900' : 'bg-teal-700'}
              relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
                pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
            <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-lg  text-purple-700">
              {shortenAddress(address as string, 6)}
            </span>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  Options
                  <ChevronDownIcon
                    className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      <button className="text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm">
                        {shortenAddress(address as string, 8)}
                      </button>
                    </Menu.Item>
                  </div>
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-violet-500 text-white' : 'text-gray-900'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          {active ? (
                            <EditActiveIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                          ) : (
                            <EditActiveIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                          )}
                          Edit
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-violet-500 text-white' : 'text-gray-900'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          onClick={() => onClickSignout()}
                        >
                          {active ? (
                            <SignoutIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                          ) : (
                            <SignoutIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                          )}
                          Sign Out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </Disclosure>
  )
}
