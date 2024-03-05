interface LogoProps {
    size?: number,
    color?: string
}

function Logo({size = 27, color = "#8F48C7"}: LogoProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        viewBox="0 0 27 27"
      >
        <path
          fill={color}
          fillRule="evenodd"
          stroke={color}
          d="M26 13.5C26 20.404 20.404 26 13.5 26S1 20.404 1 13.5 6.596 1 13.5 1 26 6.596 26 13.5zM9.791 22.815c.747.298 1.381-.47 1.06-1.208L5.75 9.936c-.321-.738-1.316-.795-1.605-.045a10 10 0 00-.67 3.609c0 4.226 2.615 7.84 6.315 9.315zM7.717 7.951c-.494-1.188-.195-2.6.93-3.224a9.979 9.979 0 014.853-1.25c1.78 0 3.451.463 4.9 1.277 1.123.63 1.413 2.046.91 3.232l-3.986 9.398c-.692 1.631-3.007 1.623-3.688-.013l-3.918-9.42zm15.131 1.924c-.29-.75-1.285-.69-1.606.047l-5.088 11.684c-.32.737.314 1.505 1.06 1.207a10.027 10.027 0 006.31-9.313c0-1.278-.24-2.5-.676-3.625z"
          clipRule="evenodd"
        ></path>
      </svg>
    );
  }
  
  export default Logo;