'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Post() {
    const [content, setContent] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!content.trim()) return;

        const res = await fetch('http://localhost:8000/memos', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content }),
        });

        if (res.ok) {
            setContent('');
            router.push('/'); // メモ一覧ページにリダイレクト
        } else {
            alert('追加に失敗しました！');
        }
    };
    
    return (
        <main className="p-4">
            <h1 className="text-2xl font-bold mb-4">新しいメモを追加</h1>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="メモの内容を入力"
                    className="flex-1 p-2 border rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    追加
                </button>
            </form>
        </main>
    );
}