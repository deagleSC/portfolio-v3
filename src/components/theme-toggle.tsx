"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  const themes = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  return (
    <>
      {/* Desktop: Simple toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className="hidden lg:inline-flex h-9 w-9"
        onClick={() => {
          if (resolvedTheme === "dark") {
            setTheme("light");
          } else {
            setTheme("dark");
          }
        }}
        aria-label="Toggle theme"
      >
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>

      {/* Mobile: Opens drawer with options */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden h-9 w-9"
        onClick={() => setIsOpen(true)}
        aria-label="Toggle theme"
      >
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Choose Theme</DrawerTitle>
            <DrawerDescription>
              Select your preferred appearance
            </DrawerDescription>
          </DrawerHeader>
          <nav className="flex flex-col gap-2 p-6 pb-10">
            {themes.map((t) => {
              const Icon = t.icon;
              return (
                <DrawerClose asChild key={t.value}>
                  <Button
                    variant={theme === t.value ? "secondary" : "ghost"}
                    size="lg"
                    onClick={() => setTheme(t.value)}
                    className="justify-start text-lg font-medium"
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {t.label}
                  </Button>
                </DrawerClose>
              );
            })}
          </nav>
        </DrawerContent>
      </Drawer>
    </>
  );
}
