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
import PostList from "@/components/List/PostList";

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
        <div>
          <PostList
            data={[
              {
                title: 'Title',
                description: 'Description',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title2',
                description: 'Description1',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title3',
                description: 'Description2',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title4',
                description: 'Description3',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title5',
                description: 'Description4',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title6',
                description: 'Description5',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title7',
                description: 'Description6',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title8',
                description: 'Description7',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title9',
                description: 'Description8',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title10',
                description: 'Description9',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title11',
                description: 'Description10',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title12',
                description: 'Description11',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title13',
                description: 'Description12',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title13',
                description: 'Description12',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title13',
                description: 'Description12',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title13',
                description: 'Description12',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title13',
                description: 'Description12',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title13',
                description: 'Description12',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title13',
                description: 'Description12',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title13',
                description: 'Description12',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title13',
                description: 'Description12',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title13',
                description: 'Description12',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title13',
                description: 'Description12',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title13',
                description: 'Description12',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title13',
                description: 'Description12',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title13',
                description: 'Description12',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title13',
                description: 'Description12',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title13',
                description: 'Description12',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title13',
                description: 'Description12',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title13',
                description: 'Description12',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title13',
                description: 'Description12',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title13',
                description: 'Description12',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title13',
                description: 'Description12',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title13',
                description: 'Description12',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title13',
                description: 'Description12',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title13',
                description: 'Description12',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title13',
                description: 'Description12',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title13',
                description: 'Description12',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title13',
                description: 'Description12',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              },
              {
                title: 'Title13',
                description: 'Description12',
                tags: ['tag1', 'tag2'],
                img: AuthorImg,
                date: 0,
                authorData: {
                  name: 'John Carter',
                  img: AuthorImg,
                },
              }
            ]}
          />
        </div>
      </div>
    </>
  );
}

export default AuthorPage;
