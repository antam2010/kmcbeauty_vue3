"use client";

import { useEffect, useState, Fragment } from "react";
import { useCustomerModalStore } from "@/manager/stores/useCustomerModalStore";
import { createPhonebook, updatePhonebook } from "@/shared/api/phonebook";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { X } from "lucide-react";
import type { PhonebookInput } from "@/shared/types/phonebook";
import GroupCombobox from "../common/GroupCombobox";
import { useGroupStore } from "@/manager/stores/usePhonebookGroupStore";
import { useNotificationStore } from "@/shared/stores/useNotificationStore";
import { parseErrorMessage } from "@/shared/utils/parseErrorMessage";

type Props = {
  onComplete?: () => void;
};

export default function CustomerFormModal({ onComplete }: Props) {
  const { isOpen, mode, data, close } = useCustomerModalStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [group, setGroup] = useState("");
  const [memo, setMemo] = useState("");

  const { groupList, isLoading, error, fetchGroups } = useGroupStore();

  const resetForm = () => {
    setName("");
    setPhone("");
    setGroup("");
    setMemo("");
  };

  useEffect(() => {
    if (groupList.length === 0) fetchGroups();
  }, [groupList.length, fetchGroups]);

  useEffect(() => {
    if (mode === "edit" && data) {
      setName(data.name);
      setPhone(data.phone_number);
      setGroup(data.group_name || "");
      setMemo(data.memo || "");
    } else {
      resetForm();
    }
  }, [mode, data]);

  const handleSaveClick = async () => {
    if (!name || !phone) {
      useNotificationStore
        .getState()
        .show("이름과 전화번호는 필수 입력입니다.", "error");
      return;
    }

    const payload: PhonebookInput = {
      name,
      phone_number: phone,
      group_name: group,
      memo,
    };

    try {
      if (mode === "create") {
        await createPhonebook(payload);
        useNotificationStore
          .getState()
          .show("고객이 등록되었습니다.", "success");
      } else if (mode === "edit" && data) {
        await updatePhonebook(data.id, payload);
        useNotificationStore
          .getState()
          .show("고객 정보가 수정되었습니다.", "success");
      }
      onComplete?.();
      close();
    } catch (e) {
      useNotificationStore.getState().show(parseErrorMessage(e), "error");
    }
  };

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
            <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl relative">
              <button
                onClick={close}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-semibold mb-6">
                {mode === "create" ? "신규 고객 등록" : "고객 정보 수정"}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    이름
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="이름 입력"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    전화번호
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="010-0000-0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    그룹
                  </label>
                  {isLoading ? (
                    <p className="text-sm text-gray-400">불러오는 중...</p>
                  ) : error ? (
                    <p className="text-sm text-red-500">에러: {error}</p>
                  ) : (
                    <GroupCombobox
                      value={group}
                      onChange={setGroup}
                      options={groupList.map((g) => g.group_name)}
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    메모
                  </label>
                  <input
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    className="mt-1 w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="메모 (선택)"
                  />
                </div>
              </div>

              <div className="mt-6 text-right">
                <button
                  onClick={handleSaveClick}
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  저장
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
