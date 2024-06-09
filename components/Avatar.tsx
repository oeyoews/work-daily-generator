import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function AvatarOeyoews() {
  return (
    <Avatar>
      <AvatarImage
        src="https://avatars.githubusercontent.com/u/72405338?v=4"
        alt="@oeyoews"
      />
      <AvatarFallback>oeyoews</AvatarFallback>
    </Avatar>
  );
}
