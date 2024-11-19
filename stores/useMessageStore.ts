import { create } from "zustand";
import { faker } from "@faker-js/faker";
import { persist } from "zustand/middleware";

import { IUser } from "@interfaces/IUser";

export interface IMessageStore {
  messages: IMessage[];
  addMessage: (message: IMessage) => void;
  removeMessage: (id: string) => void;
  reset: () => void;
}

export const exampleUsers: Record<string, IUser> = {
  user: {
    name: "user",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=male",
  },
  bot: {
    name: "bot",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=female",
  },
};

const defaultExampleMessage = {
  id: faker.string.uuid(),
  body: "Hello, how can I help you?",
  recipient: exampleUsers.user,
  sender: exampleUsers.bot,
  createdAt: new Date(),
};

export interface IMessage {
  id: string;
  body: string;
  recipient: IUser;
  sender: IUser;
  createdAt: Date;
}

export const useMessageStore = create<IMessageStore>()(
  persist(
    (set) => ({
      messages: [defaultExampleMessage],
      addMessage: (message: IMessage): void => {
        set((state: IMessageStore) => ({
          messages: [
            ...state.messages,
            { ...message, createdAt: message.createdAt || new Date() },
          ].sort((a, b) => {
            return (
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          }),
        }));
      },
      removeMessage: (id: string): void =>
        set((state: IMessageStore) => ({
          messages: state.messages.filter((message) => message.id !== id),
        })),
      reset: (): void =>
        set(() => ({
          messages: [defaultExampleMessage],
        })),
    }),
    {
      name: "messages",
    }
  )
);
