import {FacebookLogo, InstagramLogo, TiktokLogo, XLogo} from "@phosphor-icons/react/dist/ssr";

export default function FooterSection() {
  return (
    <div className='bottom-0 flex flex-col border-t w-5/6 p-4 gap-4 mx-auto text-xs text-center text-gray-700'>
      <div className="flex gap-4 justify-center">
        <FacebookLogo size={32} className=" cursor-pointer" weight="light" />
        <InstagramLogo size={32} className=" cursor-pointer" weight="light" />
        <TiktokLogo size={32} className=" cursor-pointer" weight="light" />
        <XLogo size={32} className=" cursor-pointer" weight="light" />
      </div>
      <div className="font-light">
        © 2024{' '}
        <a href='mailto: kolamaster@gmail.com'>MIIZELLA ORGANIC SKINCARE🍃</a>
      </div>
    </div>
  );
}
