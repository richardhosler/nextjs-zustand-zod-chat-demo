import Image from "next/image";
import { JSX, useState } from "react";
import ReactMarkdown from "react-markdown";

import { Avatar } from "@components/Avatar";
import { Button } from "@components/Button";
import { IMessage } from "@stores/useMessageStore";

interface IBubbleProps {
  message: IMessage;
  handleDelete: (id: string) => void;
}

export function Bubble({ message, handleDelete }: IBubbleProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const {
    body,
    sender: { name, avatar },
  } = message;

  return (
    <div
      className={`flex flex-row gap-2 items-center ${
        name === "bot" ? "flex-row-reverse self-start" : "self-end"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && name !== "bot" && (
        <Button
          title="Delete"
          onClick={() => handleDelete(message.id)}
          className="px-2 py-1 rounded-full text-sm bg-gray-300 max-h-8"
        >
          <div className="flex text-gray-800 text-center space-x-1">
            <Image
              className="text-gray-800"
              src="/delete.svg"
              width={16}
              height={16}
              alt="delete"
            />
            <span>Delete</span>
          </div>
        </Button>
      )}
      <Avatar username={name} avatar={avatar} />
      <div className="relative">
        <div
          className={`${
            name === "bot" ? "bg-green-600" : "bg-blue-600"
          }  text-gray-50 py-3 px-5 rounded-3xl space-y-2 whitespace-pre-wrap max-w-72`}
        >
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
