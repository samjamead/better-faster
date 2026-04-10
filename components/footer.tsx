import { ThemeSwitcher } from "@/components/theme-switcher";

export const Footer = () => {
  return (
    <footer className="max-w-custom mx-auto w-full">
      <div className="flex w-full items-center justify-center gap-8 pt-4 pb-16">
        <ThemeSwitcher />
      </div>
    </footer>
  );
};
