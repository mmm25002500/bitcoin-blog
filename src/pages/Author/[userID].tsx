import HorizontalLine from "@/components/HorizontalLine";
import Navbar from "@/components/Layout/Navbar";
import Avater from "@/components/User/Avater";
import { useRouter } from "next/router";
import AuthorImg from '@/icons/examplePhoto/author.png';
import AuthorData from '@/config/Author.json';
import { useEffect, useState } from "react";
import Button from "@/components/Button/Button";
import Icon from "@/components/Icon";

import DownIcon from '@/icons/down.svg';
import UpIcon from '@/icons/up.svg';
import Header from "@/components/Layout/Header";

const getAuthorData = (userID: string) => {
  return AuthorData.filter((author) => author.id === userID);
}

const AuthorPage = () => {
  const router = useRouter();
  const { userID } = router.query;

  const [author, setAuthor] = useState({ fullname: '', name: '', description: '', image: '', id: '' });
  const [postQuantity, setPostQuantity] = useState(0);

  const [collaspe, setCollaspe] = useState(true);

  useEffect(() => {
    setAuthor(getAuthorData(userID as string)[0]);
  }, [userID]);

  return (
    <>
      <div className="sm:hidden">
        <Header />
      </div>
      <Navbar />
      <HorizontalLine />
      <div className="mx-auto px-6 sm:px-28 p">
        <div className="flex gap-10 my-5">
          <div className="flex-none">
            <Avater
              src={AuthorImg}
              className=""
            />
          </div>
          <div className="flex flex-wrap sm:flex-nowrap sm:grid sm:grid-cols-1 gap-1">
            {/* 名字 */}
            <div className="flex-none font-semibold text-base leading-6 sm:font-bold sm:text-[28px] sm:leading-[42px] text-neutral-black dark:text-neutral-white">
              {author?.fullname}
            </div>
            <div className="flex-grow"></div>

            {/* 文章數量 */}
            <div className="flex-none font-medium text-sm leading-5 text-neutral-800 dark:text-neutral-200">
              {postQuantity} Posts
            </div>

            {/* 描述 */}
            <div className="col-span-2 sm:col-span-1 font-normal text-sm leading-6 text-neutral-900 dark:text-neutral-300 overflow-hidden">
              <p className={collaspe ? 'line-clamp-2' : ''}>
                {author?.description}
              </p>
            </div>

            {/* 查看更多 按鈕 */}
            <div>
              <Button
                onClick={() => setCollaspe(!collaspe)}
                type={"large"}
                className="dark:border-neutral-white flex items-center gap-2">
                {
                  collaspe ? (
                    <>
                      查看更多
                      <Icon
                        icon_light={DownIcon}
                        className="invert dark:invert-0"
                      />
                    </>
                  ) : (
                    <>
                      收合
                      <Icon
                        icon_light={UpIcon}
                        className="invert dark:invert-0"
                      />
                    </>
                  )
                }

              </Button>
            </div>
          </div>
        </div>
        <HorizontalLine className="dark:border-neutral-200" />
      </div>
    </>
  );
}

export default AuthorPage;
