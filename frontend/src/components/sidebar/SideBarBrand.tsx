export default function SideBarBrand() {
  return (
    <a
      href="/app/dashboard"
      className="flex flex-row items-center justify-center lg:ps-2.5 mb-1 gap-1 font-brand font-thin"
    >
      <img
        height={48}
        width={48}
        src="/favicon.svg"
        alt={import.meta.env.VITE_BRAND}
        title={import.meta.env.VITE_BRAND}
      />
      <span className="flex sm:hidden lg:flex lg:ml-4 self-center text-2xl md:text-3xl font-semibold whitespace-nowrap text-p300">
        CRM Portal
      </span>
    </a>
  );
}
