import Link from "next/link";
import { Zap, Twitter, Linkedin, Github, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Zap className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold">GWC Robotics</span>
            </Link>
            <p className="text-zinc-400 mb-4">
              Pioneering the future of robotic intelligence with advanced scanning 
              and profiling systems.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={<Twitter className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Linkedin className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Github className="h-5 w-5" />} />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink href="/products">Products</FooterLink>
              <FooterLink href="/solutions">Solutions</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/research">Research</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-400 mr-2 mt-1 flex-shrink-0" />
                <span className="text-zinc-400">
                  NUST CEME, Department of Mechanical Engineering, Islamabad, 78000
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0" />
                <span className="text-zinc-400">+92 (317) 287-6180</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0" />
                <span className="text-zinc-400">info@gwcrobotics.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-zinc-400 mb-4">
              Subscribe to our newsletter for the latest updates on robotics innovation.
            </p>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-zinc-900 border-zinc-800"
              />
              <Button className="w-full">Subscribe</Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-zinc-800 pt-8 mt-8 text-center text-zinc-500 text-sm">
          <p>© {new Date().getFullYear()} GWC Robotics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <li>
      <Link 
        href={href} 
        className="text-zinc-400 hover:text-white transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
}

function SocialLink({ href, icon }: SocialLinkProps) {
  return (
    <a 
      href={href} 
      className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-blue-600 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  );
}