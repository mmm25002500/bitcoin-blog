import { TabDataProps } from "@/types/Tab/Tab";

const Tab = (props: TabDataProps) => {

  const handleTabChange = (tabName: string, tabLink: string) => {
    props.onChange(tabName);
  };

  return (
    <div className={`flex ${props.className}`}>
      {props.data.map((tab, key) => (
        <label key={tab.name + key} className="pt-1  cursor-pointer">
          <input
            type="radio"
            name="tab"
            value={tab.name}
            checked={props.selectedTab === tab.name}
            onChange={() => handleTabChange(tab.link, tab.link)}
            className="hidden"
          />
          <p className={`font-medium text-base leading-6 inline-block px-3 pb-2 ${props.selectedTab === tab.link ? 'border-b-2 border-neutral-black dark:border-white text-neutral-black dark:text-neutral-white' : 'text-neutral-800 dark:text-neutral-600'}`}>
            {tab.name}
          </p>
        </label>
      ))}
    </div>
  );
}

export default Tab;
