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

export default function Career({
  career,
  setCareer,
}: {
  career: string;
  setCareer: Function;
}) {
  const items = ['前端开发', '后端开发', '测试工程师'];

  const handleChange = (event: any) => {
    setCareer(event);
    notify.info('岗位已切换为' + items.find((item) => item === event));
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
            {items.map((item, index) => (
              <SelectItem
                className="cursor-pointer"
                key={index}
                value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
