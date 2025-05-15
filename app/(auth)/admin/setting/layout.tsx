import SettingsNavigation from "./Components/SettingsNavigation";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full space-y-2 px-4 md:px-5">
      <SettingsNavigation />
      {/* Tab Panels */}
      {children}
    </div>
  );
};

export default layout;
