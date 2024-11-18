"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { forwardRef, useState } from "react";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className = "", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const disabled =
      props.value === "" || props.value === undefined || props.disabled;

    return (
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className={`w-full rounded-md border border-gray-300 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          className={`absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600 focus:outline-none ${
            disabled ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={disabled}
        >
          {showPassword && !disabled ? (
            <EyeIcon className="h-4 w-4" aria-hidden="true" />
          ) : (
            <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
          )}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </button>

        <style jsx>{`
          input::-ms-reveal,
          input::-ms-clear {
            display: none;
          }
        `}</style>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
