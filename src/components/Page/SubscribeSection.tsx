import mail_dark from "@/icons/mail_dark.svg";
import InputText from "@/components/Input/InputText";
import { useState } from 'react';
import { SubscribeSection } from "@/types/HomePage/SubscribeSction";

const SubscribeSection = (props: SubscribeSection) => {
  const [email, setEmail] = useState('');

  return (
    <section className={`${props.className}`}>
      <p className="text-2xl leading-9 text-center">
        訂閱我們電子報
      </p>
      <p className="text-sm text-neutral-900 dark:text-neutral-200 text-center py-7">
        踏上區塊鏈之旅！新手探險家或是渴望區塊鏈領域持續進化的你，<br />這是發現無限可能性的最佳起點！
      </p>
      <div className="flex justify-center">
        <InputText
          placeholder={"輸入您的 Mail"}
          btnText="訂閱"
          text={email}
          icon={mail_dark}
          onChange={(e) => setEmail(e.target.value)}
          onClick={() => console.log('訂閱')}
          className='w-96'
        />
      </div>
    </section>
  );
}

export default SubscribeSection;
