// 傳入：總數number
// 內容：1~number

import { PaginationData } from '@/types/Pagination/PaginationData';
import { useRouter } from 'next/navigation';

const Pagination = (props: PaginationData) => {

  const router = useRouter();
  return (
    <div className={`flex ${props.className}`}>
      {
        // left arrow
        <button
          onClick={() => { router.push(`${props.link}/${props.page - 1}`); }}
          className="pt-1 pb-3 py-0.5 px-2.5"
        >
          <p className="text-primary-black-300 disabled:text-primary-black-400 hover:text-black-30 text-base font-medium leading-6">
            {'<'}
          </p>
        </button>
      }
      {
        // 1~number
        Array.from({ length: props.pageSize }, (_, i) => i + 1).map((page, key) => (
          <button
            onClick={() => { router.push(`${props.link}/${props.page}`); }}
            key={page + key}
            className="pt-1 pb-3 py-0.5 px-2.5 active:border-b-2 active:border-neutral-black">
            <p className="text-neutral-600 hover:text-neutral-700 active:text-primary-black-300 text-base font-medium leading-6">
              {page}
            </p>
          </button>
        ))
      }
    </div>
  )
}

export default Pagination;
