import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";
import BounceLoading from "../Loading/BounceLoading";

const Button = ({
  children,
  color = "dark",
  variant = "default",
  className,
  disabled = false,
  loading = false,
  ...props
}) => {
  const baseStyles =
    "font-medium rounded-lg text-sm px-5 py-2.5  focus:outline-none text-center relative";
  const colorStyles = {
    blue: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
    alternative:
      "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",
    dark: "text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700",
    light:
      "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700",
    green:
      "text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
    red: "text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
    yellow:
      "text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900",
    purple:
      "text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900",
  };

  const variantStyles = {
    default: "",
    disabled: "opacity-50 cursor-not-allowed",
    loading: "cursor-wait",
  };

  return (
    <button
      type="button"
      className={twMerge(
        baseStyles,
        colorStyles[color],
        variantStyles[variant],
        disabled ? variantStyles.disabled : "",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      <div
        className={twMerge(
          "flex items-center gap-2 justify-center",
          loading ? "opacity-0 " : "opacity-1 "
        )}
      >
        {children}
      </div>

      <BounceLoading
        className={twMerge(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10",
          loading ? "opacity-1" : "opacity-0"
        )}
      />
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf([
    "blue",
    "alternative",
    "dark",
    "light",
    "green",
    "red",
    "yellow",
    "purple",
  ]),
  variant: PropTypes.oneOf(["default", "disabled", "loading"]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
