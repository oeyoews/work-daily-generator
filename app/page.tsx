'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ButtonsSkeleton, GeneratorSkeleton } from '@/components/Skeleton';
import { Skeleton } from '@/components/ui/skeleton';
import { Toaster, toast as notify } from 'sonner';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import TableList from '@/components/Table';
import Career from '@/components/Career';
import { ModeToggle } from '@/components/DarkMode';
import { AvatarOeyoews } from '@/components/Avatar';
import TodayType from '@/components/TaskType';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [career, setCareer] = useState('前端开发');

  const [date, setDate] = useState('');
  const [type, setType] = useState('done');

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
    if (!todayItems.length) {
      notify.error('请填写今日完成');
      setType('done');
      inputRef.current?.focus();
      return;
    }
    if (!planItems.length) {
      notify.error('请填写明日计划');
      setType('plan');
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
    setTodayItems([]);
    setPlanItems([]);
  };

  const [todayItems, setTodayItems] = useState<any>([]);
  const [planItems, setPlanItems] = useState<any>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const action = {
    done: setTodayItems,
    plan: setPlanItems,
  };

  const items = {
    done: todayItems,
    plan: planItems,
  };

  const save = () => {
    if (inputRef.current!.value === '') {
      notify.warning('请输入内容');
      inputRef.current!.focus();
      return;
    }
    action[type]([...items[type], inputRef.current!.value]);
    inputRef.current!.value = '';
    inputRef.current!.focus();
  };

  const handleInputChange = (event: any) => {
    if (event.key === 'Enter') {
      save(items[type]);
    }
  };

  const deleteItem = (items, index: number) => {
    // @ts-ignore
    action[type](items.filter((_, i) => i !== index));
  };

  const dayList = (items: []) => {
    let text = '';
    items.forEach((item, index) => {
      text += `\t${index + 1}. ${item}\n`;
    });
    return text;
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  /** 更新预览 */
  useEffect(() => {
    setText(`【时间】 ${date}
【岗位】 ${career}

【今日完成】
${dayList(todayItems)}
【明日计划】
 ${dayList(planItems)}
【无法克服的问题】
\t无
【所需支持】
\t无`);
  }, [date, career, todayItems, planItems]);

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
                  className="placeholder:text-gray-400"
                  ref={inputRef}
                  placeholder="请输入内容"
                />
              </div>
              <TodayType
                type={type}
                setType={setType}
              />
              <div>
                <Button
                  size={'sm'}
                  onClick={() => save()}>
                  新增
                </Button>
              </div>
            </div>

            {items[type].length === 0 ? (
              <div className="text-center text-sm mt-6 italic">空空如也!</div>
            ) : null}
            {type === 'done' && (
              <ul className="list-none text-sm">
                {todayItems.map((item: [], index: number) => (
                  <li
                    key={index}
                    className="group font-semibold p-1 bg-neutral-100 dark:bg-neutral-900 rounded-md pl-4 -ml-8 flex justify-between items-center text-green-500">
                    {item}
                    <Button
                      size={'sm'}
                      className="select-none opacity-0 group-hover:opacity-100 delay-100 transition-all group-hover:bg-rose-600 ml-4"
                      onClick={() => deleteItem(todayItems, index)}>
                      删除
                    </Button>
                  </li>
                ))}
              </ul>
            )}
            {/* <hr /> */}
            {type === 'plan' && (
              <ul className="list-none text-sm">
                {planItems.map((item: [], index: number) => (
                  <li
                    key={index}
                    className="group font-semibold p-1 bg-neutral-100 dark:bg-neutral-900 rounded-md pl-4 -ml-8 flex justify-between items-center text-rose-400">
                    {item}
                    <Button
                      size={'sm'}
                      className="select-none opacity-0 group-hover:opacity-100 delay-100 transition-all group-hover:bg-rose-600 ml-4"
                      onClick={() => deleteItem(planItems, index)}>
                      删除
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="w-full md:border-l-2 pl-2">
            {/* <TableList /> */}
            {/* <h2>预览</h2> */}
            <Textarea
              className="mt-5 font-semibold text-base"
              readOnly={false}
              rows={18}
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
