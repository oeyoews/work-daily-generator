'use client';

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
      inputRef.current.focus();
      return;
    }
    navigator.clipboard.writeText(text);
    notify.success('复制成功');
  };

  const data = `${date}, ${career},`;

  useEffect(() => {
    setDate(new Date().toLocaleString().split(' ')[0]);
  }, []);

  const handleChangeReadOnly = () => {
    setReadOnly(!readOnly);
  };

  const [key, setKey] = useState(0);

  const forceUpdate = () => {
    notify.success('重置成功');
    setKey(key + 1);
    setCareer('');
    setItems([]);
  };

  const [items, setItems] = useState([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const save = () => {
    if (!event.target.value) {
      notify.warning('请输入内容');
      return;
    }
    setItems([...items, inputRef.current.value]);
    inputRef.current.value = '';
  };

  const handleInputChange = (event) => {
    if (event.key === 'Enter') {
      save();
    }
  };

  const deleteItem = (index) => {
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
    inputRef.current.focus();
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

  return (
    <div className="mt-9">
      <h2 className="text-center">
        日报生成器
        <img
          src="https://avatars.githubusercontent.com/u/72405338?v=4"
          className="rounded-full size-8 inline-block ml-3 object-cover shadow-sm animate-bounce"
        />
      </h2>
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
      <div className="flex justify-between gap-3">
        <div
          className="mt-10 w-full"
          key={key}>
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

          <ol>
            {items.map((item, index) => (
              <li
                key={index}
                className="group font-semibold">
                {item}
                <Button
                  size={'sm'}
                  className="select-none opacity-0 group-hover:opacity-100 delay-300 transition-all group-hover:bg-rose-700 ml-4"
                  onClick={() => deleteItem(index)}>
                  删除
                </Button>
              </li>
            ))}
          </ol>
        </div>

        <div className="w-full border-l-2 pl-2">
          {/* <TableList /> */}
          {/* <h2>预览</h2> */}
          <Textarea
            className="mt-5 font-semibold"
            readOnly={false}
            rows={14}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
