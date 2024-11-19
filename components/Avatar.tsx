import Image from "next/image";
import { HTMLAttributes, JSX } from "react";

interface IAvatarProps extends HTMLAttributes<HTMLDivElement> {
  username: string;
  avatar: string;
  size?: number;
}

export function Avatar({
  username,
  avatar,
  size = 40,
}: IAvatarProps): JSX.Element {
  return (
    <div className="flex flex-grow items-center gap-2 text-sm" title={username}>
      <div className="rounded-full bg-gray-700 overflow-clip">
        <Image src={avatar} alt={username} width={size} height={size} />
      </div>
    </div>
  );
}
