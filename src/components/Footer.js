
import {Link} from 'react-router-dom';
export const Footer = () => {
  return (
    <footer className="bg-white shadow-sm dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2030 <Link to="/" className="hover:underline">ExamPortal</Link>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a target="_blank" href="/" className="hover:underline me-4 md:me-6">Instagram</a>
          </li>
          <li>
            <a target="_blank" href="/" className="hover:underline me-4 md:me-6">LinkedIn</a>
          </li>
          <li>
            <a target="_blank" href="/" className="hover:underline me-4 md:me-6">Youtube</a>
          </li>
          <li>
            <a target="_blank" href="/" className="hover:underline">Github</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
export default Footer;