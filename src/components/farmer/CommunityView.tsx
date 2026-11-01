import React, { useState } from 'react';
import { CommunityPost } from '../../types/market';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useNotification } from '../../context/NotificationContext';
import { 
  Users2, 
  Heart, 
  MessageCircle, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  Image as ImageIcon 
} from 'lucide-react';

interface CommunityViewProps {
  posts: CommunityPost[];
  onToggleLike: (postId: string) => void;
  onAddPost: (post: CommunityPost) => void;
}

export const CommunityView: React.FC<CommunityViewProps> = ({ posts, onToggleLike, onAddPost }) => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const { showToast } = useNotification();

  const [newPostContent, setNewPostContent] = useState('');
  const [selectedCropTag, setSelectedCropTag] = useState('Cotton');
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      authorId: user?.id || 'user-farmer-1',
      authorName: user?.name || 'Ramesh Kumar',
      authorRole: 'Progressive Farmer',
      authorVillage: user?.location || 'Warangal',
      content: newPostContent,
      cropTag: selectedCropTag,
      likesCount: 1,
      likedByCurrentUser: true,
      commentsCount: 0,
      comments: [],
      createdAt: 'Just now'
    };

    onAddPost(newPost);
    setNewPostContent('');
    showToast('success', 'Shared with Community', 'Your experience was posted to the farmer forum.');
  };

  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId];
    if (!text?.trim()) return;

    const post = posts.find(p => p.id === postId);
    if (post) {
      post.comments.push({
        id: `c-${Date.now()}`,
        authorName: user?.name || 'Ramesh Kumar',
        text,
        timestamp: 'Just now'
      });
      post.commentsCount += 1;
      setCommentInputs({ ...commentInputs, [postId]: '' });
      showToast('info', 'Comment added');
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
            <Users2 className="w-5 h-5" />
          </span>
          <h2 className="text-xl font-bold text-slate-900">{t('community')}</h2>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Peer-to-peer knowledge sharing: Real field stories, pest alerts, and successful harvest techniques from fellow farmers.
        </p>
      </div>

      {/* Post Creator Box */}
      <form onSubmit={handleCreatePost} className="bg-slate-50 p-5 rounded-3xl border border-slate-200 space-y-3">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Share Your Farming Experience or Ask Community
        </span>
        <textarea
          rows={3}
          required
          placeholder="Share your crop variety, fertilizer results, pest observations or questions..."
          value={newPostContent}
          onChange={e => setNewPostContent(e.target.value)}
          className="w-full p-3 text-xs bg-white border border-slate-300 rounded-2xl leading-relaxed"
        />

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold">Crop Tag:</span>
            <select
              value={selectedCropTag}
              onChange={e => setSelectedCropTag(e.target.value)}
              className="p-1.5 text-xs bg-white border border-slate-300 rounded-xl"
            >
              <option value="Cotton">Cotton</option>
              <option value="Chilli">Chilli</option>
              <option value="Paddy">Paddy</option>
              <option value="Maize">Maize</option>
              <option value="Weather Advisory">Weather Advisory</option>
            </select>
          </div>

          <button
            type="submit"
            className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition"
          >
            Post to Feed
          </button>
        </div>
      </form>

      {/* Feed Stream */}
      <div className="space-y-6">
        {posts.map(post => (
          <div
            key={post.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs"
          >
            {/* Author */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-slate-900">{post.authorName}</h4>
                <p className="text-[11px] text-slate-500">
                  {post.authorRole} • {post.authorVillage} • {post.createdAt}
                </p>
              </div>

              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                {post.cropTag}
              </span>
            </div>

            {/* Content */}
            <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-line">
              {post.content}
            </p>

            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt="Community Attachment"
                className="w-full max-h-72 object-cover rounded-2xl border border-slate-200"
              />
            )}

            {/* Interaction Bar */}
            <div className="flex items-center gap-6 pt-3 border-t border-slate-100 text-xs text-slate-600 font-semibold">
              <button
                onClick={() => onToggleLike(post.id)}
                className={`flex items-center gap-1.5 transition ${
                  post.likedByCurrentUser ? 'text-rose-600 font-bold' : 'hover:text-rose-600'
                }`}
              >
                <Heart className={`w-4 h-4 ${post.likedByCurrentUser ? 'fill-rose-600' : ''}`} />
                <span>{post.likesCount} Helpful</span>
              </button>

              <div className="flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4 text-slate-400" />
                <span>{post.commentsCount} Comments</span>
              </div>
            </div>

            {/* Comments Thread */}
            {post.comments.length > 0 && (
              <div className="bg-slate-50 p-4 rounded-2xl space-y-2 border border-slate-100 text-xs">
                {post.comments.map(c => (
                  <div key={c.id} className="pb-2 border-b border-slate-200/60 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <strong className="text-slate-900 font-bold">{c.authorName}</strong>
                      <span className="text-[10px] text-slate-400">{c.timestamp}</span>
                    </div>
                    <p className="text-slate-600 mt-0.5">{c.text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Comment Input */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                placeholder="Write a supportive reply..."
                value={commentInputs[post.id] || ''}
                onChange={e => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleAddComment(post.id);
                }}
                className="flex-1 p-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
              />
              <button
                type="button"
                onClick={() => handleAddComment(post.id)}
                className="p-2 bg-emerald-700 text-white rounded-xl text-xs hover:bg-emerald-800"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

