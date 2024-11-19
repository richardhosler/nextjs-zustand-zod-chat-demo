import { faker } from "@faker-js/faker";
import { zodResolver } from "@hookform/resolvers/zod";
import { JSX, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Bubble } from "@components/Bubble";
import { Button } from "@components/Button";
import { DebugWidget } from "@components/DebugWidget";
import { TextArea } from "@components/TextArea";

import {
  useMessageStore,
  exampleUsers,
  IMessage,
} from "../stores/useMessageStore";

export default function Home(): JSX.Element {
  const {
    messages,
    addMessage,
    removeMessage,
    reset: resetStore,
  } = useMessageStore();
  const messageSchema = z.object({
    message: z
      .string()
      .min(1, "Message cannot be empty")
      .max(1000, "Message cannot exceed 1,000 characters"),
  });

  type MessageSchema = z.infer<typeof messageSchema>;

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema),
  });
  const capitalizeFirst = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const handleFormSubmit: SubmitHandler<MessageSchema> = ({ message }) => {
    addMessage({
      id: faker.string.uuid(),
      body: message,
      recipient: exampleUsers.bot,
      sender: exampleUsers.user,
      createdAt: new Date(),
    });
    resetField("message");

    const fakeMessageId = faker.string.uuid();
    addMessage({
      id: fakeMessageId,
      body: "...",
      recipient: exampleUsers.user,
      sender: exampleUsers.bot,
      createdAt: new Date(),
    });
    setTimeout(() => {
      removeMessage(fakeMessageId);
      addMessage({
        id: fakeMessageId,
        body: capitalizeFirst(faker.word.words(10)),
        recipient: exampleUsers.user,
        sender: exampleUsers.bot,
        createdAt: new Date(),
      });
    }, 2000);
  };
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <div className="flex gap-4 p-8 place-content-center">
      <div className="bg-white rounded-xl p-4 space-y-4">
        <div className="flex items-center font-semibold">
          <div>
            <p className="text-xl text-gray-600">AI Assistant</p>
            <p className="text-green-600">Online</p>
          </div>
        </div>
        <div className="flex flex-col space-y-8 justify-start p-4 bg-gray-200 rounded-lg h-full overflow-y-scroll max-h-70svh w-96 min-w-96 max-w-96">
          {messages.map((message: IMessage) => (
            <Bubble
              key={`bubble-${message.id}`}
              message={message}
              handleDelete={removeMessage}
            />
          ))}
        </div>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col"
        >
          <div className="flex items-center gap-4">
            <TextArea
              placeholder="Type your message..."
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  handleSubmit(handleFormSubmit)();
                }
              }}
              {...register("message")}
            />

            <Button type="submit">Send</Button>
          </div>
          {errors.message && (
            <span className="text-jsonred text-sm mt-1">
              {errors.message.message}
            </span>
          )}
        </form>
      </div>
      {isMounted && (
        <DebugWidget messages={messages} handleReset={resetStore} />
      )}
    </div>
  );
}
