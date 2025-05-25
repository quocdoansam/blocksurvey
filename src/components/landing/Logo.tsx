import { useEffect, useState, type ImgHTMLAttributes } from "react";

interface LogoProps extends ImgHTMLAttributes<HTMLImageElement> {
  size?: number;
}

const Logo = ({ size = 48, ...props }: LogoProps) => {
  const [isDarkMode, setIsDarkMode] = useState(() =>
    window.document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const root = window.document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDarkMode(root.classList.contains("dark"));
    });

    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <img
      src={isDarkMode ? "/logo-white.svg" : "/logo.svg"}
      alt='Logo'
      width={size}
      height={size}
      title='BlockSurvey'
      {...props}
    />
  );
};

export default Logo;
