export function Footer() {
  return (
    <footer className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/50 px-4 py-3 shadow-xl">
      <div className="text-base font-semibold leading-normal text-gray-700 md:text-sm">
        {new Date().getFullYear()} - Todos os direitos reservados
      </div>
    </footer>
  )
}
