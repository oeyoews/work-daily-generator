'use client';

import { GeneratorSkeleton } from '@/components/Skeleton';
import { Skeleton } from '@/components/ui/skeleton';
import { Toaster, toast as notify } from 'sonner';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import TableList from '@/components/Table';
import { Input } from '@/components/ui/input';

import Career from '@/components/Career';
import { DatePicker } from '@/components/DatePicker';
import { Textarea } from '@/components/ui/textarea';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ModeToggle } from '@/components/DarkMode';
import { AvatarOeyoews } from '@/components/Avatar';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [career, setCareer] = useState('前端开发');
  const [date, setDate] = useState('');

  const [text, setText] = useState('');

  const handleCopy = () => {
    if (!text) {
      notify.error('请输入内容');
      return;
    }
    if (!career) {
      notify.error('请选择岗位');
      return;
    }
    if (!items.length) {
      notify.error('请填写完成事项');
      inputRef.current?.focus();
      return;
    }
    navigator.clipboard.writeText(text);
    notify.success('复制成功');
  };

  const data = `${date}, ${career},`;

  useEffect(() => {
    setDate(new Date().toLocaleString().split(' ')[0]);
  }, []);

  const [key, setKey] = useState(0);

  const forceUpdate = () => {
    notify.success('重置成功');
    setKey(key + 1);
    setCareer('');
    setItems([]);
  };

  const [items, setItems] = useState<any>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const save = () => {
    if (inputRef.current!.value === '') {
      notify.warning('请输入内容');
      inputRef.current!.focus();
      return;
    }
    setItems([...items, inputRef.current!.value]);
    inputRef.current!.value = '';
    inputRef.current!.focus();
  };

  const handleInputChange = (event: any) => {
    if (event.key === 'Enter') {
      save();
    }
  };

  const deleteItem = (index: number) => {
    // @ts-ignore
    setItems(items.filter((_, i) => i !== index));
  };

  const itemsList = (items: []) => {
    let text = '';
    items.forEach((item, index) => {
      text += `\t${index + 1}. ${item}\n`;
    });
    return text;
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setText(`【时间】: ${date}
【岗位】: ${career}
【本周完成】:
${itemsList(items)}【无法克服的问题】
\t无
【所需支持】
\t无`);
  }, [date, career, items]);

  const ButtonsSkeleton = () => {
    return (
      <div className="gap-3 justify-end flex">
        {[...Array(3)].map((_, index) => {
          return (
            <Skeleton
              className="w-12 h-9"
              key={index}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="antialiased">
      <h2 className="text-center my-0">
        日报生成器
        <img
          src="https://avatars.githubusercontent.com/u/72405338?v=4"
          className="rounded-full size-8 inline-block ml-3 object-cover shadow-sm animate-bounce"
        />
      </h2>
      {!text ? (
        <ButtonsSkeleton />
      ) : (
        <div className="gap-3 justify-end flex">
          <Button
            size={'sm'}
            onClick={forceUpdate}>
            重置
          </Button>
          <Button
            size={'sm'}
            onClick={handleCopy}>
            复制
          </Button>
          <ModeToggle />
        </div>
      )}
      {/* // body */}
      {!text ? (
        <GeneratorSkeleton />
      ) : (
        <div className="md:flex justify-between gap-3">
          <div className="mt-10 w-full">
            <Career
              career={career}
              setCareer={setCareer}
            />
            <div className="flex items-center mt-5 gap-4">
              <div className="w-full">
                <Input
                  onChange={handleInputChange}
                  onKeyDown={handleInputChange}
                  ref={inputRef}
                  placeholder="请输入内容"
                />
              </div>
              <div>
                <Button
                  size={'sm'}
                  onClick={save}>
                  新增
                </Button>
              </div>
            </div>

            <ul className="list-none">
              {items.map((item: [], index: number) => (
                <li
                  key={index}
                  className="group font-semibold p-2 bg-neutral-100 dark:bg-neutral-900 rounded-md pl-4 -ml-8 flex justify-between items-center">
                  {item}
                  <Button
                    size={'sm'}
                    className="select-none opacity-0 group-hover:opacity-100 delay-100 transition-all group-hover:bg-rose-600 ml-4"
                    onClick={() => deleteItem(index)}>
                    删除
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full md:border-l-2 pl-2">
            {/* <TableList /> */}
            {/* <h2>预览</h2> */}
            <Textarea
              className="mt-5 font-semibold text-base"
              readOnly={false}
              rows={14}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
