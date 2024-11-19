"use client";

import { JSX } from "react";
import JsonFormatter from "react-json-formatter";

import { Button } from "@components/Button";
import { IMessage } from "@stores/useMessageStore";

interface IDebugWidgetProps {
  messages: IMessage[];
  handleReset: () => void;
}
const jsonStyle = {
  propertyStyle: { color: "#0451a5", fontWeight: 700 }, // Dark blue with bold
  stringStyle: { color: "#a31515" }, // Dark red
  numberStyle: { color: "#098658" }, // Dark green
  braceStyle: { color: "#000000", fontWeight: 500 }, // Black with semibold
};

export function DebugWidget({
  messages,
  handleReset: resetStore,
}: IDebugWidgetProps): JSX.Element {
  return (
    <div>
      <div className="bg-white p-4 rounded-xl text-gray-600 space-y-4">
        <div>
          <p className="text-xl  font-semibold">Debug</p>
          <p>
            Current Message Count:
            {messages.length.toLocaleString()}
          </p>
        </div>
        <div>
          <pre className="bg-gray-200 p-4 rounded-lg whitespace-pre-wrap max-w-2xl min-w-2xl">
            <JsonFormatter
              json={JSON.stringify(messages[messages.length - 1], null, 2)}
              jsonStyle={jsonStyle}
            />
          </pre>
        </div>
        <div className="flex place-content-end">
          <Button onClick={resetStore}>Reset Zustand Store</Button>
        </div>
      </div>
    </div>
  );
}
