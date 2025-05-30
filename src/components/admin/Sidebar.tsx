import {
  faArrowLeft,
  faBell,
  faBox,
  faCog,
  faCreditCard,
  faQuestionCircle,
  faSearch,
  faThLarge,
  faUsers,
  faUserTie
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-56 flex-col justify-start border-r-1 bg-[#0f172a] text-[#94a3b8] transition-colors duration-300 select-none dark:bg-[#15233c] dark:text-[#94a3b8]">
      <div className="px-6 pt-6">
        <div className="mb-8 flex items-center gap-2">
          <FontAwesomeIcon icon={faUserTie} />
          <span className="text-lg font-semibold text-white">EvoShop</span>
          <button
            aria-label="Collapse sidebar"
            className="ml-auto text-[#94a3b8] hover:text-white"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </div>

        <div className="relative">
          <input
            className="w-full rounded-md bg-[#15233c] py-2 pr-10 pl-3 text-sm placeholder-[#475569] focus:ring-1 focus:ring-[#475569] focus:outline-none dark:bg-[#0f172a] dark:placeholder-[#94a3b8]"
            placeholder="Search"
            type="search"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs text-[#475569] dark:text-[#94a3b8]"
          />
        </div>

        <nav className="mt-8 space-y-2 text-sm font-medium">
          <button
            disabled
            className="flex cursor-default items-center gap-2 text-[#475569] select-none dark:text-[#64748b]"
          >
            <FontAwesomeIcon icon={faThLarge} />
            Dashboard
          </button>
          <button className="flex w-full items-center gap-2 rounded-md bg-[#1e293b] px-3 py-2 text-white dark:bg-[#0f172a]">
            <FontAwesomeIcon icon={faBox} />
            Products
          </button>
          <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 hover:text-white">
            <FontAwesomeIcon icon={faCreditCard} />
            Payments
          </button>
          <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 hover:text-white">
            <FontAwesomeIcon icon={faUsers} />
            Customers
          </button>
        </nav>

        <nav className="mt-10 space-y-2 text-sm font-medium">
          <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 hover:text-white">
            <FontAwesomeIcon icon={faBell} />
            Notifications
            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-semibold text-white">
              7
            </span>
          </button>
          <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 hover:text-white">
            <FontAwesomeIcon icon={faQuestionCircle} />
            Help & support
          </button>
          <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 hover:text-white">
            <FontAwesomeIcon icon={faCog} />
            Settings
          </button>
        </nav>
      </div>
    </aside>
  );
}
