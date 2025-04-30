"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CircleChevronRight } from "lucide-react";

const ProductsDropdown = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 mt-1 z-50 bg-white dark:bg-zinc-900 shadow-lg rounded-md overflow-hidden min-w-[280px] border border-border"
    >
      <div className="p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">
          Our Products
        </h3>
        <ul className="space-y-1">
          <ProductLink 
            href="/products/intrascan-155" 
            title="Intrascan-155" 
            description="Advanced robotic scanning system"
          />
        </ul>
        
        <div className="mt-4 pt-3 border-t border-border">
          <Link 
            href="/products" 
            className="flex items-center text-sm text-primary hover:underline"
          >
            View all products
            <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

interface ProductLinkProps {
  href: string;
  title: string;
  description: string;
}

const ProductLink = ({ href, title, description }: ProductLinkProps) => (
  <li>
    <Link 
      href={href}
      className="flex items-start p-2 hover:bg-muted rounded-md transition-colors group"
    >
      <CircleChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 group-hover:text-primary/80" />
      <div>
        <div className="font-medium text-foreground">{title}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
    </Link>
  </li>
);

export default ProductsDropdown;