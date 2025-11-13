import React, { useState, useEffect } from "react";
import { Toast, ToastToggle } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";

export function ToastComponent({ message = "Action completed", type = "success" }) {
  const [visible, setVisible] = useState(true);

  // Auto-hide after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null; // Don't render if not visible

  // Choose color/icon based on type
  const styles = {
    success: {
      bg: "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200",
      icon: <HiCheck className="h-5 w-5" />,
    },
    error: {
      bg: "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200",
      icon: <HiX className="h-5 w-5" />,
    },
  };

  const { bg, icon } = styles[type] || styles.success;

  return (
    <div className="fixed top-4 right-4 z-50">
      <Toast>
        <div className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${bg}`}>
          {icon}
        </div>
        <div className="ml-3 text-sm font-normal text-gray-300">{message}</div>
        <ToastToggle onDismiss={() => setVisible(false)} />
      </Toast>
    </div>
  );
}
