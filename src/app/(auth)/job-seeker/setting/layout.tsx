import SettingsNavigation from "./Components/SettingsNavigation";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full px-4 md:px-5 space-y-2">
      <SettingsNavigation />
      {/* Tab Panels */}
      {children}
    </div>
  );
};

export default layout;
