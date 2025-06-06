import React, { useState } from "react";
import { FiUser, FiMail, FiSave, FiEye, FiEyeOff } from "react-icons/fi";
import { BiLock, BiBell } from "react-icons/bi";
import { RiResetLeftFill } from "react-icons/ri";

const InputField = ({
  icon: Icon,
  label,
  name,
  disabled = false,
  type = "text",
  value,
  placeholder,
  showPassword,
  togglePassword,
  error,
  onChange,
}) => (
  <div className="space-y-2">
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type={type === "password" && showPassword ? "text" : type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
          error
            ? "border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-500"
            : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
        } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={togglePassword}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          {showPassword ? (
            <FiEyeOff className="h-5 w-5" />
          ) : (
            <FiEye className="h-5 w-5" />
          )}
        </button>
      )}
    </div>
    {error && (
      <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
        <span className="w-1 h-1 bg-red-600 dark:bg-red-400 rounded-full"></span>
        {error}
      </p>
    )}
  </div>
);

const Settings = () => {
  const [formData, setFormData] = useState({
    email: "",
    currentPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isReset, setIsReset] = useState(false);

  const handleReset = () => {
    setFormData({
      email: "",
      currentPassword: "",
    });
    setErrors({});
    setIsReset(true);
    setSubmitSuccess(false);
    setTimeout(() => setIsReset(false), 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Password is required";
    } else if (formData.currentPassword.length < 6) {
      newErrors.currentPassword = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);

    const isValid = validate();

    if (isValid) {
      setTimeout(() => {
        setSubmitSuccess(true);
        console.log("Submitted successfully:", formData);
        setIsSubmitting(false);
      }, 1000);
    } else {
      setIsSubmitting(false);
    }
  };

  const [enabled, setEnabled] = useState(false);
  const handleToggle = () => {
    setEnabled((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center lg:py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl space-y-8 transform transition-all duration-300 hover:scale-[1.01]">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Account Settings
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Manage your profile and preferences
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          <InputField
            icon={FiMail}
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            disabled={isSubmitting}
          />

          <InputField
            icon={BiLock}
            label="Current Password"
            name="currentPassword"
            type="password"
            placeholder="Enter your password"
            value={formData.currentPassword}
            onChange={handleChange}
            error={errors.currentPassword}
            showPassword={showCurrentPassword}
            togglePassword={() => setShowCurrentPassword(!showCurrentPassword)}
            disabled={isSubmitting}
          />

          <div className="flex items-center justify-between">
            <span className="flex-grow text-gray-700 dark:text-gray-300 font-medium">
              Email Notifications
            </span>
            <button
              type="button"
              onClick={handleToggle}
              className={`${
                enabled ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-800`}
              role="switch"
              aria-checked={enabled}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                aria-hidden="true"
                className={`${
                  enabled ? "translate-x-5" : "translate-x-0"
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>

          <div className="flex lg:flex-row md:flex-row flex-col lg:gap-0 md:gap-4 gap-3 justify-between items-center lg:space-x-4">
            <button
              type="button"
              onClick={handleReset}
              disabled={isSubmitting}
              className={`lg:w-auto md:w-auto w-40 flex-1 flex items-center justify-center lg:px-6 md:px-6 px-2 lg:py-3 md:py-3 py-2 border border-transparent text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-900 transition-colors duration-200 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <RiResetLeftFill className="h-5 w-5 mr-2" />
              Reset
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`lg:w-auto md:w-auto w-40 flex-1 flex items-center justify-center lg:px-6 md:px-6 px-2 lg:py-3 md:py-3 py-2 border border-transparent text-base font-medium rounded-md text-white ${
                isSubmitting
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-900 transition-colors duration-200`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <FiSave className="h-5 w-5 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
          {submitSuccess && (
            <p className="mt-4 text-center text-sm text-green-600 dark:text-green-400">
              Settings updated successfully!
            </p>
          )}
          {isReset && (
            <p className="mt-4 text-center text-sm text-yellow-600 dark:text-yellow-400">
              Reset successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Settings;
