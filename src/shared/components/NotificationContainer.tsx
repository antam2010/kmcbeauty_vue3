"use client";

import { useNotificationStore } from "@/shared/stores/useNotificationStore";
import { Transition } from "@headlessui/react";

export default function NotificationContainer() {
  const { notifications } = useNotificationStore();

  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-2">
      {notifications.map((n) => (
        <Transition
          key={n.id}
          appear
          show
          enter="transform transition duration-300"
          enterFrom="opacity-0 translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={`px-4 py-2 rounded shadow-md text-sm text-white ${
              n.type === "success"
                ? "bg-green-500"
                : n.type === "error"
                  ? "bg-red-500"
                  : "bg-gray-700"
            }`}
          >
            {n.message}
          </div>
        </Transition>
      ))}
    </div>
  );
}
