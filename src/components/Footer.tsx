import Logo from "./landing/Logo";
import NavFooter from "./navigations/NavFooter";

const Footer = () => {
  const groups = [
    {
      title: "Follow US",
      items: [
        {
          path: "https://github.com/quocdoansam",
          content: "Github",
        },
      ],
    },
    {
      title: "Help And Support",
      items: [{ path: "/contact", content: "Contact US" }],
    },
    {
      title: "Legal",
      items: [
        { path: "/privacy-policy", content: "Privacy Policy" },
        { path: "terms-conditions", content: "Terms & Conditons" },
      ],
    },
  ];
  return (
    <footer className='flex flex-col md:flex-row justify-between items-start py-5 md:py-10 gap-12 md:gap-0'>
      <div className='flex items-center'>
        <Logo />
        <h1 className='text-2xl font-bold'>BlockSurvey</h1>
      </div>
      <NavFooter groups={groups} />
    </footer>
  );
};

export default Footer;
