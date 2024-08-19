import React, { useEffect, useState } from "react";
import { Drawer } from "@material-tailwind/react";
import { useRouter } from 'next/navigation';
import { HomePageSidebarProps } from "@/types/Sidebar/HomePageSidebar";

const HomePageSidebar = (props: HomePageSidebarProps) => {
  const [open, setOpen] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(props.isDrawerOpen);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const router = useRouter();

  // 控制展開和收起
  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  useEffect(() => {
    setIsDrawerOpen(props.isDrawerOpen);
  }, [props.isDrawerOpen]);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => {
    setIsDrawerOpen(false)
    props.setIsDrawerOpen(false);
  };

  return (
    <>
      <Drawer open={isDrawerOpen}
        onClose={closeDrawer}
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
        placement="right"
        className={`text-white dark:bg-neutral-black ${props.className}`}
        transition={{ type: "spring", duration: 0.3 }}
        overlayProps={{
          className: "fixed bg-neutral-black/50 backdrop-blur-none",
          onClick: closeDrawer
        }}
      >
        {props.children}
      </Drawer>
    </>
  );
}

export default HomePageSidebar;
