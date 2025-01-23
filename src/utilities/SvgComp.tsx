type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
};

function SvgComp({ src, alt, width, height, className }: Props) {
  return (
    <img
      src={src}
      alt={alt}
      width={`${width} + px`}
      height={`${height} + px`}
      className={className}
    />
  );
}

export default SvgComp;
