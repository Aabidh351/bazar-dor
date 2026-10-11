"use client";

import { useState } from "react";

export type SortOrder = "default" | "asc" | "desc";

type SortingProps = {
  value: SortOrder;
  onChange: (value: SortOrder) => void;
};

export default function Sorting({ value, onChange }: SortingProps) {
  const [isOpen, setIsOpen] = useState(false);

  const options: { label: string; value: SortOrder }[] = [
    { label: "ডিফল্ট", value: "default" },
    { label: "দামঃ কম থেকে বেশি", value: "asc" },
    { label: "দামঃ বেশি থেকে কম", value: "desc" },
  ];

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="flex items-center gap-3 text-[#68716A]">
      <span className="text-base">সাজান</span>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className="flex items-center gap-3 rounded-xl border border-[#D0D8D1] bg-[#FAFCFA] px-4 py-2.5 text-sm text-[#202820] transition hover:border-[#05893E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#05893E]"
        >
          {selectedOption?.label ?? "ডিফল্ট"}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {isOpen && (
          <div
            role="listbox"
            aria-label="সাজানোর ধরন"
            className="absolute right-0 z-20 mt-2 min-w-36 overflow-hidden rounded-xl border border-[#DDE7DF] bg-white p-1 shadow-lg"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={value === option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition hover:bg-[#EFF5F0] ${
                  value === option.value
                    ? "bg-[#E0F2E5] font-semibold text-[#05893E]"
                    : "text-[#202820]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
