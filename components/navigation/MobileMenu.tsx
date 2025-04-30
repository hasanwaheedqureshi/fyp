"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  onClose: () => void;
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleDropdown = (item: string) => {
    setExpandedItem(prev => (prev === item ? null : item));
  };

  // ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className="fixed top-0 right-0 w-4/5 max-w-sm h-full bg-background border-l border-border shadow-lg p-6 overflow-y-auto"
          onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
        >
          <nav className="flex flex-col space-y-4">
            <div>
              <button
                onClick={() => toggleDropdown("products")}
                className="flex items-center justify-between w-full p-3 text-lg font-medium text-foreground"
              >
                <span>Products</span>
                {expandedItem === "products" ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>

              <AnimatePresence>
                {expandedItem === "products" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-4 pl-2 border-l border-border overflow-hidden"
                  >
                    <Link
                      href="/products/intrascan-155"
                      onClick={onClose}
                      className="block py-2 px-3 text-foreground/70 hover:text-foreground transition-colors"
                    >
                      Intrascan-155
                    </Link>
                    <Link
                      href="/products"
                      onClick={onClose}
                      className="block py-2 px-3 text-foreground/70 hover:text-foreground transition-colors"
                    >
                      View All Products
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <MobileNavLink href="/solutions" onClick={onClose}>
              Solutions
            </MobileNavLink>
            <MobileNavLink href="/about" onClick={onClose}>
              About Us
            </MobileNavLink>
            <MobileNavLink href="/research" onClick={onClose}>
              Research
            </MobileNavLink>
            <MobileNavLink href="/blog" onClick={onClose}>
              Blog
            </MobileNavLink>
            <MobileNavLink href="/contact" onClick={onClose}>
              Contact
            </MobileNavLink>

            <div className="pt-6 border-t border-border mt-6">
              <Link
                href="/contact"
                onClick={onClose}
                className="block w-full p-3 text-center bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </motion.div>
      </motion.div>
    </AnimatePresence>
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
