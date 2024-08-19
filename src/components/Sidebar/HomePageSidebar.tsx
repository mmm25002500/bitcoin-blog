import React, { useEffect, useState } from "react";
import { Card, Drawer } from "@material-tailwind/react";
import { useRouter } from 'next/navigation';
import { HomePageSidebarProps } from "@/types/Sidebar/HomePageSidebar";
import Close from "../Button/Close";

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
        className="text-white dark:bg-neutral-black"
        transition={{ type: "spring", duration: 0.3 }}
        overlayProps={{
          className: "fixed bg-neutral-black/50 backdrop-blur-none",
          onClick: closeDrawer
        }}
      >
        <Card
          color="transparent"
          shadow={false}
          className="h-full w-full p-4 overflow-y-auto" nonce={undefined} onResize={undefined} onResizeCapture={undefined} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <p className="mt-2 sm:mt-3 sm:mr-5 sm:mb-2 text-right font-medium text-sm leading-[22px]">
            <Close
              className=""
              onClick={closeDrawer}
            />
          </p>
          {/* 類別 */}

          <div className={`mx-5 ${props.className}`}>
            {props.children}
          </div>
        </Card>
      </Drawer>
    </>
  );
}

export default HomePageSidebar;
