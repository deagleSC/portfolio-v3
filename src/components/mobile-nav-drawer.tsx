"use client";

import { ExternalLink } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import type { NavItem } from "@/types/portfolio";

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  onNavClick: (href: string, isExternal?: boolean) => void;
}

export function MobileNavDrawer({
  isOpen,
  onClose,
  navItems,
  onNavClick,
}: MobileNavDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent>
        <DrawerHeader className="sr-only">
          <DrawerTitle>Navigation Menu</DrawerTitle>
          <DrawerDescription>
            Navigate to different sections of the portfolio
          </DrawerDescription>
        </DrawerHeader>
        <nav className="flex flex-col gap-2 p-6 pb-10">
          {navItems.map((item) => (
            <DrawerClose asChild key={item.href}>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => onNavClick(item.href, item.isExternal)}
                className="justify-start text-lg font-medium text-foreground hover:text-primary hover:bg-accent transition-colors"
              >
                {item.label}
                {item.isExternal && <ExternalLink className="ml-2 h-4 w-4" />}
              </Button>
            </DrawerClose>
          ))}
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
