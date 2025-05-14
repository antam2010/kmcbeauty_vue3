import { useState, useEffect, Fragment } from 'react'
import { useCustomerModalStore } from '@/manager/stores/useCustomerModalStore'
import { createPhonebook, updatePhonebook } from '@/shared/api/phonebook'

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react'

export default function CustomerFormModal({ onComplete }: { onComplete?: () => void }) {
  const { isOpen, mode, data, close } = useCustomerModalStore()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [group, setGroup] = useState('')
  const [memo, setMemo] = useState('')

  useEffect(() => {
    if (mode === 'edit' && data) {
      setName(data.name)
      setPhone(data.phone_number)
      setGroup(data.group_name || '')
      setMemo(data.memo || '')
    } else {
      setName('')
      setPhone('')
      setGroup('')
      setMemo('')
    }
  }, [mode, data])

  const handleSubmit = async () => {
    const payload = { name, phone_number: phone, group_name: group, memo }
    try {
      if (mode === 'create') {
        await createPhonebook(payload)
      } else if (mode === 'edit' && data) {
        await updatePhonebook(data.id, payload)
      }
      onComplete?.()
      close()
    } catch (e) {
      console.error(e)
      alert('저장에 실패했습니다.')
    }
  }

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={close}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="w-full max-w-md rounded bg-white p-6 shadow-xl">
              <h2 className="text-lg font-bold mb-4">
                {mode === 'create' ? '신규 고객 등록' : '고객 정보 수정'}
              </h2>
              <div className="space-y-3">
                <input value={name} onChange={e => setName(e.target.value)} className="w-full border px-2 py-1 rounded" placeholder="이름" />
                <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full border px-2 py-1 rounded" placeholder="전화번호" />
                <input value={group} onChange={e => setGroup(e.target.value)} className="w-full border px-2 py-1 rounded" placeholder="그룹명" />
                <input value={memo} onChange={e => setMemo(e.target.value)} className="w-full border px-2 py-1 rounded" placeholder="메모" />
              </div>
              <div className="mt-4 text-right">
                <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">저장</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  )
}
