"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  onClose: () => void;
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleDropdown = (item: string) => {
    if (expandedItem === item) {
      setExpandedItem(null);
    } else {
      setExpandedItem(item);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 top-16 z-40 bg-background border-t border-border overflow-y-auto"
    >
      <div className="container mx-auto px-4 py-6">
        <nav className="flex flex-col space-y-4">
          <div>
            <button
              onClick={() => toggleDropdown('products')}
              className="flex items-center justify-between w-full p-3 text-lg"
            >
              <span>Products</span>
              {expandedItem === 'products' ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
            
            {expandedItem === 'products' && (
              <div className="ml-4 pl-2 border-l border-border">
                <Link
                  href="/products/intrascan-155"
                  onClick={onClose}
                  className="block py-2 px-3 text-foreground/70 hover:text-foreground"
                >
                  Intrascan-155
                </Link>
                <Link
                  href="/products"
                  onClick={onClose}
                  className="block py-2 px-3 text-foreground/70 hover:text-foreground"
                >
                  View All Products
                </Link>
              </div>
            )}
          </div>

          <MobileNavLink href="/solutions" onClick={onClose}>Solutions</MobileNavLink>
          <MobileNavLink href="/about" onClick={onClose}>About Us</MobileNavLink>
          <MobileNavLink href="/research" onClick={onClose}>Research</MobileNavLink>
          <MobileNavLink href="/blog" onClick={onClose}>Blog</MobileNavLink>
          <MobileNavLink href="/contact" onClick={onClose}>Contact</MobileNavLink>

          <div className="pt-4 mt-4 border-t border-border">
            <Link
              href="/contact"
              onClick={onClose}
              className="block w-full p-3 text-center bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </div>
    </motion.div>
  );
}

interface MobileNavLinkProps {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}

function MobileNavLink({ href, onClick, children }: MobileNavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block p-3 text-lg text-foreground/70 hover:text-foreground transition-colors"
    >
      {children}
    </Link>
  );
}