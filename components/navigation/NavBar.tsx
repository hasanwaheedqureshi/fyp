"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductsDropdown from "./ProductsDropdown";
import MobileMenu from "./MobileMenu";
import { navItemHover } from "@/lib/animations";

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? "hidden" : "auto";
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
            <Zap className="h-8 w-8 text-primary" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
              GWC Robotics
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <div
              className="relative"
              onMouseEnter={() => setShowProductsDropdown(true)}
              onMouseLeave={() => setShowProductsDropdown(false)}
            >
              <motion.button
                className="flex items-center gap-1 transition-colors"
                initial={{ color: "rgb(255,255,255,0.7)" }}
                animate={{
                  color: isScrolled ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)",
                }}
                whileHover={{
                  color: isScrolled ? "#000000" : "#ffffff",
                }}
                transition={{ duration: 0.3 }}
              >
                Products
                <ChevronDown className="h-4 w-4" />
              </motion.button>
              {showProductsDropdown && <ProductsDropdown />}
            </div>

            <NavLink href="/solutions" isScrolled={isScrolled}>Solutions</NavLink>
            <NavLink href="/about" isScrolled={isScrolled}>About Us</NavLink>
            <NavLink href="/research" isScrolled={isScrolled}>Research</NavLink>
            <NavLink href="/blog" isScrolled={isScrolled}>Blog</NavLink>
            <NavLink href="/contact" isScrolled={isScrolled}>Contact</NavLink>

            <Button size="sm" className="ml-4">
              Get Started
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button
            className={cn(
              "md:hidden p-2 transition-colors",
              isScrolled ? "text-foreground" : "text-white"
            )}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && <MobileMenu onClose={toggleMobileMenu} />}
    </header>
  );
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isScrolled: boolean;
}

function NavLink({ href, children, isScrolled }: NavLinkProps) {
  return (
    <motion.div variants={navItemHover} initial="initial" whileHover="hover">
      <Link href={href} passHref>
        <motion.a
          className="transition-colors cursor-pointer"
          initial={{ color: "rgba(255,255,255,0.7)" }}
          animate={{
            color: isScrolled ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)",
          }}
          whileHover={{
            color: isScrolled ? "#000000" : "#ffffff",
          }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.a>
      </Link>
    </motion.div>
  );
}
