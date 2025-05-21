import type { ImgHTMLAttributes } from "react";

interface LogoProps extends ImgHTMLAttributes<HTMLImageElement> {
  size?: number;
}

const Logo = ({ size = 48, ...props }: LogoProps) => {
  return (
    <img
      src='/logo.svg'
      alt='Logo'
      style={{ width: size, height: size }}
      title='BlockSurvey'
      {...props}
    />
  );
};

export default Logo;
