const OXO_GRAY600 = '#e6e6e6';

export default function IconSearch({
  color = OXO_GRAY600,
  width = 23,
  height = 22,
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 23 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16.9 9.4C16.9 13.5 13.6 16.8 9.5 16.8C5.4 16.8 2 13.5 2 9.4C2 5.3 5.3 2 9.4 2C13.5 2 16.9 5.3 16.9 9.4ZM15.7 16.5C14 18 11.9 18.9 9.5 18.9C4.2 18.9 0 14.6 0 9.4C0 4.2 4.2 0 9.4 0C14.6 0 18.8 4.2 18.8 9.4C18.8 11.5 18.1 13.4 17 15L22.3 20.3C22.7 20.7 22.7 21.3 22.3 21.7C21.9 22.1 21.3 22.1 20.9 21.7L15.7 16.5Z'
        fill={color}
      />
    </svg>
  );
}