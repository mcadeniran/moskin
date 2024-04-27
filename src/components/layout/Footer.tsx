import {FacebookLogo, InstagramLogo, TiktokLogo, XLogo} from "@phosphor-icons/react/dist/ssr";

export default function FooterSection() {
  return (
    <div className='bottom-0 flex flex-col border-t w-5/6 p-4 gap-4 mx-auto text-xs text-center text-slate-700'>
      <div className="flex gap-4 justify-center">
        <FacebookLogo size={22} className=" cursor-pointer" weight="light" />
        <InstagramLogo size={22} className=" cursor-pointer" weight="light" />
        <XLogo size={22} className=" cursor-pointer" weight="light" />
      </div>
      <div className="font-light">
        © 2024{' '}
        <a href='mailto: kolamaster@gmail.com'>MIIZELLA ORGANIC SKINCARE🍃</a>
      </div>
    </div>
  );
}
