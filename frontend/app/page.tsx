'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Memo = {
  id: number;
  content: string;
  created_at: string;
};

export default function Home() {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:8000/memos')
      .then((res) => res.json())
      .then((data) => setMemos(data));
  }, []);

  const handleDelete = async (id: number) => {
    const res = await fetch(`http://localhost:8000/memos/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setMemos((prev) => prev.filter((memo) => memo.id !== id));
    } else {
      alert('削除に失敗しました');
    }
  };

  const handleUpdate = async (id: number) => {
    const res = await fetch(`http://localhost:8000/memos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: editingContent }),
    });

    if (res.ok) {
      setMemos((prev) =>
        prev.map((memo) =>
          memo.id === id ? { ...memo, content: editingContent } : memo
        )
      );
      setEditingId(null);
      setEditingContent('');
    } else {
      alert('更新に失敗しました');
    }
  };

  return (
    <main className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">メモ一覧</h1>
        <Link href="/post">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            メモを追加
          </button>
        </Link>
      </div>
      <ul className="space-y-2">
        {memos.map((memo) => (
          <li
            key={memo.id}
            className="bg-gray-800 p-3 rounded shadow flex justify-between items-center"
          >
            <div className="flex-1">
              {editingId === memo.id ? (
                <>
                  <input
                    type="text"
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    className="p-2 w-full text-white rounded"
                  />
                  <button
                    onClick={() => handleUpdate(memo.id)}
                    className="text-green-400 text-sm mt-1 hover:underline"
                  >
                    保存
                  </button>
                </>
              ) : (
                <>
                  <p>{memo.content}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(memo.created_at).toLocaleString()}
                  </p>
                </>
              )}
            </div>
            <div className="flex flex-col gap-1 ml-2">
              {editingId !== memo.id && (
                <button
                  onClick={() => {
                    setEditingId(memo.id);
                    setEditingContent(memo.content);
                  }}
                  className="text-yellow-300 text-sm hover:underline"
                >
                  編集
                </button>
              )}
              <button
                onClick={() => handleDelete(memo.id)}
                className="text-red-400 text-sm hover:underline"
              >
                削除
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
