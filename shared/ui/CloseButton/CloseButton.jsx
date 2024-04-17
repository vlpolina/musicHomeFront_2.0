export const CloseButton = ({ setOpen }) => {
  return (
    <button
      type="button"
      className="-m-2.5 rounded-md p-2.5 text-gray-700"
      onClick={() => {
        setOpen(false)
      }}
    >
      <span className="sr-only">Закрыть</span>
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  )
}
