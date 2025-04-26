"use client";

import { useState, useEffect } from "react";
import GetResponse from "@/services/AIResponse";
import { FaRobot } from "react-icons/fa";

export default function ChatBot({ defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const callGPT = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setResponse("");
    try {
      const ans = await GetResponse(question);
      setResponse(ans);
    } catch (err) {
      setResponse("Sorry, something went wrong.");
      console.error(err);
    } finally {
      setLoading(false);
      setQuestion("");
    }
  };

  const onEnter = (e) => {
    if (e.code === "Enter" && !e.shiftKey) {
      e.preventDefault();
      callGPT();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#FF4500] hover:bg-[#e03f00] text-white p-4 rounded-full shadow-lg flex items-center justify-center"
        >
          <FaRobot className="w-6 h-6" />
        </button>
      ) : (
        <div className="w-96 h-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#FF4500] text-white flex items-center justify-between p-3">
            <h2 className="text-lg font-extrabold ">Preto</h2>
            <button onClick={() => setIsOpen(false)} className="text-white text-xl leading-none">&times;</button>
          </div>

          {/* Chat History */}
          <div className="flex-1 w-full overflow-y-auto p-4 space-y-3 bg-gray-50">
            {loading && (
              <div className="text-gray-500 italic animate-pulse">Loading…</div>
            )}
            {response && !loading && (
              <div className="bg-blue-50 text-gray-800 p-3 rounded-lg shadow">
                {response}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-3 border-t bg-white flex items-end gap-2">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={onEnter}
              placeholder="Talk to Preto, your AI Assistant..."
              className="flex-1 h-16 p-2 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
            <button
              onClick={callGPT}
              disabled={loading || !question.trim()}
              className="bg-[#FF4500] hover:bg-[#e03f00] text-white px-3 py-2 rounded"
            >
              Ask
            </button>
          </div>
        </div>
      )}
    </div>
  );
}