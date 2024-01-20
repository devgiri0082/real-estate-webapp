import Image from "next/image"
import { FaLinkedin } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { RiFacebookCircleFill } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa";
type FooterLink = {
  title: string
  links: string[]
}


const footerLinks: FooterLink[] = [
  {
    title: 'neighborhoods',
    links: [
      'Neighborhoods in Tel Aviv',
      'Neighborhoods in Jerusalem',
      'Neighborhoods in Givatayim',
      'Neighborhoods in Ashdod',
      'Neighborhoods in Petah Tikva',
    ]
  },
  {
    title: 'general',
    links: [
      'About',
      'Blog',
      'Contact Us',
    ]
  },
]

export default function Footer() {
  return (
    <footer className="">
      <section className="py-5 px-40 bg-gradient-to-r flex justify-between items-center  to-gray-700 to-100% from-teal-600 from-30% vai-teal-600 via-80% text-white">
        <div className="flex gap-12 ">
          {footerLinks.map((footerLink) => (
            <FooterLink key={footerLink.title} {...footerLink}/>
          ))}
        </div>
        <div dir="ltr">
          <Image alt="Logo" src="/logo.png" width={85} height={85} className="mb-7"/>
          <div className="flex gap-6">
            <FaLinkedin className="text-xl cursor-pointer" />
            <BsTwitterX className="text-xl cursor-pointer"/>
            <RiFacebookCircleFill className="text-xl cursor-pointer"/>
            <FaWhatsapp className="text-xl cursor-pointer"/>
          </div>
        </div>
      </section>
      <section className="px-40 py-6 flex justify-between">
        <ul className="flex gap-8 font-thin">
          <li>Accessibility Statement</li>
          <li>Terms of Service</li>
          <li>Privacy Policy</li>
        </ul>
        <h3 className="font-thin">MadaDirot 2023</h3>
      </section>
    </footer>
  )
}

function FooterLink({title, links}: FooterLink) {
  return (
    <div>
      <h2 className="font-bold mb-5">{title}</h2>
      <ul className="flex flex-col gap-1">
        {links.map((link) => (
          <li  key={link}>{link}</li>
        )
        )}
      </ul>
    </div>
  )
}