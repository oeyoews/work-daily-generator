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

export default function TodayType({
  type,
  setType,
}: {
  type: 'done' | 'plan';
  setType: Function;
}) {
  const items = [
    {
      label: '今日完成',
      value: 'done',
    },
    {
      label: '明日计划',
      value: 'plan',
    },
  ];

  const handleChange = (event: any) => {
    setType(event);
    notify.info(
      '任务事项已切换为' + items.find((item) => item.value === event).label
    );
  };

  return (
    <>
      <Select
        onValueChange={handleChange}
        value={type}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="选择" />
        </SelectTrigger>
        <SelectContent defaultValue="今日完成">
          <SelectGroup>
            {/* <SelectLabel></SelectLabel> */}
            {items.map(({ label, value }: any, index) => (
              <SelectItem
                className="cursor-pointer"
                key={index}
                value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
