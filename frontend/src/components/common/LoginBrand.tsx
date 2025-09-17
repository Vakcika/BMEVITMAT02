export default function LoginBrand() {
  return (
    <a
      href="/"
      className="flex flex-row items-center justify-center lg:ps-2.5 mb-1 gap-2 font-brand font-thin"
    >
      <img
        height={64}
        width={64}
        src="/favicon.svg"
        alt={import.meta.env.VITE_BRAND}
        title={import.meta.env.VITE_BRAND}
      />
      <span className="flex self-center text-5xl font-semibold whitespace-nowrap text-p300">
        {import.meta.env.VITE_BRAND}
      </span>
    </a>
  );
}
