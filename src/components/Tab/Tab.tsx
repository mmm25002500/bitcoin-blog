import { TabData } from "@/types/Tab/Tab";
import { useRouter } from 'next/navigation';

const Tab = (props: TabData) => {
  const router = useRouter();

  return (
    <div className={`flex ${props.className}`}>
      {props.data.map((tab, key) => (
        <button
          onClick={() => { router.push(`/${tab.link}`); }}
          key={tab.name + key}
          className="pt-1 pb-3 active:border-b-2 active:border-neutral-black dark:active:border-white"
        >
          <p className="text-neutral-800 hover:text-neutral-black active:text-neutral-black text-base font-medium leading-6 dark:text-neutral-600 dark:hover:text-neutral-400 dark:active:text-white">
            {tab.name}
          </p>
        </button>
      ))}
    </div>
  )
}

export default Tab;
