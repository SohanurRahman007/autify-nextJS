export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 sm:space-y-0 sm:flex-row">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img
            className="w-auto h-7"
            src="https://merakiui.com/images/full-logo.svg"
            alt="Logo"
          />
        </a>

        {/* Copyright */}
        <p className="text-sm text-gray-600 dark:text-gray-300">
          © {new Date().getFullYear()} All Rights Reserved.
        </p>

        {/* Social Icons */}
        <div className="flex -mx-2">
          {/* Reddit */}
          <a
            href="#"
            aria-label="Reddit"
            className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
          >
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="#"
            aria-label="Facebook"
            className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
          >
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2.002 12.002C2.003 16.921 5.58 21.11 10.439 21.881V14.892H7.902V12.002H10.442V9.802c-.113-1.043.243-2.082.972-2.835.729-.753 1.755-1.143 2.801-1.064.751.012 1.499.079 2.24.2v2.459H15.19c-.435-.057-.873.087-1.19.391-.316.304-.478.735-.439 1.173v1.878h2.771l-.443 2.891H13.563v6.989C18.817 21.051 22.502 16.252 21.948 10.961 21.393 5.67 16.793 1.74 11.481 2.017 6.168 2.294 2.003 6.682 2.002 12.002z" />
            </svg>
          </a>

          {/* GitHub */}
          <a
            href="#"
            aria-label="Github"
            className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
          >
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.026 2C7.133 1.999 2.962 5.548 2.178 10.378c-.784 4.83 2.052 9.515 6.694 11.061.5.09.679-.217.679-.481 0-.237-.008-.865-.011-1.7-2.775.6-3.361-1.338-3.361-1.338-.183-.603-.576-1.121-1.108-1.459-1-.619-.031-.633-.031-.633.641.088 1.205.468 1.528 1.029.272.496.732.863 1.277 1.018.545.155 1.129.087 1.623-.19.046-.506.271-.979.635-1.334-2.214-.251-4.542-1.107-4.542-4.93-.013-.989.354-1.945 1.026-2.671-.324-.861-.288-1.805.08-2.64 0 0 .837-.269 2.742 1.021 1.634-.448 3.358-.448 4.992 0 1.905-1.29 2.742-1.021 2.742-1.021.368.835.404 1.779.08 2.64.672.726 1.039 1.682 1.026 2.671 0 3.833-2.329 4.679-4.544 4.93.417.413.689.982.772 1.586.083.604.066 1.216.064 1.824 0 .264.179.572.68.481 4.642-1.546 7.479-6.231 6.695-11.061C21.09 5.548 16.919 1.999 12.026 2z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
