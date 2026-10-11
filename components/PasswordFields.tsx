"use client";

import { useState } from "react";
import type { InputHTMLAttributes } from "react";

type PasswordFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label: string;
};

export default function PasswordField({
  label,
  className = "",
  ...props
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <label
        htmlFor={props.id}
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      <div className="relative">
        <input
          {...props}
          type={visible ? "text" : "password"}
          className={`w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 ${className}`}
        />

        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-gray-500 transition hover:text-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
        >
          {visible ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M3 3l18 18" />
              <path d="M10.6 10.6a2 2 0 002.8 2.8" />
              <path d="M9.9 5.2A11 11 0 0112 5c5 0 8.5 4.5 9.5 7-.4 1.1-1.2 2.3-2.4 3.4" />
              <path d="M6.2 6.2C3.9 7.7 2.7 9.8 2.5 12c1 2.5 4.5 7 9.5 7 1.4 0 2.7-.4 3.8-1" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
