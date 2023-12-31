
const Flag = ({ width = 16, height = 16, fill = 'currentColor'}) => {
  return (
    <svg
    width={width}
    height={height}
      viewBox="0 0 11 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.04167 0.125H1.95833C1.58261 0.125 1.22227 0.274255 0.956596 0.539932C0.69092 0.805609 0.541664 1.16594 0.541664 1.54167V12.875L5.5 10.75L10.4583 12.875V1.54167C10.4583 1.16594 10.3091 0.805609 10.0434 0.539932C9.77772 0.274255 9.41739 0.125 9.04167 0.125Z"
        fill={fill}
      />
    </svg>
  );
};

export default Flag;
