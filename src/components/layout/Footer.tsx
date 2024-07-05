import {RiFacebookLine, RiInstagramLine, RiTwitterXFill} from "react-icons/ri";

export default function FooterSection() {
  return (
    <div className='bottom-0 flex flex-row mt-4 border-t-[0.2px] border-rosegold px-2 lg:px-8 py-5 items-center justify-between text-xs text-center'>
      <div className="font-medium">
        <a href='mailto: kolamaster@gmail.com'>© 2024 MIIZELLA ORGANIC SKINCARE🍃</a>
      </div>
      <div className="flex gap-4 justify-center">
        <div className="rounded-full p-2 border cursor-pointer">
          <RiFacebookLine size={18} />
        </div>
        <div className="rounded-full p-2 border cursor-pointer">
          <RiTwitterXFill size={18} />
        </div>
        <div className="rounded-full p-2 border cursor-pointer">
          <RiInstagramLine size={18} />
        </div>
      </div>
    </div>
  );
}
