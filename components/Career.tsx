import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Career({ career, setCareer }) {
  const items = ['前端开发', '后端开发', '测试工程师'];

  const handleChange = (event) => {
    setCareer(event);
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
