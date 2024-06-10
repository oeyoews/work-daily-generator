import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Toaster, toast as notify } from 'sonner';
import { RiTestTubeLine, RiJavaFill, RiJavascriptFill } from 'react-icons/ri';

export default function Career({
  career,
  setCareer,
}: {
  career: string;
  setCareer: Function;
}) {
  const items = [
    {
      label: '前端开发',
      icon: <RiJavascriptFill className="inline text-gray-500 size-5 mb-0.5" />,
    },
    {
      label: '后端开发',
      icon: <RiJavaFill className="inline text-gray-500 mb-0.5" />,
    },
    {
      label: '测试工程师',
      icon: <RiTestTubeLine className="inline text-gray-500 mb-0.5" />,
    },
  ];

  const handleChange = (event: any) => {
    setCareer(event);
    notify.info('岗位已切换为' + items.find((item) => item === event)?.label);
  };

  return (
    <>
      {/* <h2>选择岗位</h2> */}
      <Select
        onValueChange={handleChange}
        value={career}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="选择岗位" />
        </SelectTrigger>
        <SelectContent defaultValue="前端开发">
          <SelectGroup>
            <SelectLabel>岗位</SelectLabel>
            {items.map(({ label, icon }: any, index) => (
              <SelectItem
                className="cursor-pointer"
                key={index}
                value={label}>
                {icon} {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
