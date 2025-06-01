const CrossIcon = ({
  size = 24,
  onClick,
}: {
  size?: number;
  onClick?: () => void;
}) => {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      onClick={onClick}
    >
      <path
        d="m4.5 19.5 15-15M4.5 4.5l15 15"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default CrossIcon;
