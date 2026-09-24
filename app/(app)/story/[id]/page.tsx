import { createClient } from '@/lib/supabase/server';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import styles from './story.module.css';

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: story } = await supabase
    .from('stories')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (!story) notFound();

  const categoryLabels: Record<string, string> = {
    roots: 'Roots',
    traditions: 'Traditions',
    life_lessons: 'Life Lessons',
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/dashboard" className={styles.back}>← Back to Stories</Link>
        <Link href="/" className={styles.logo}>
          <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
            <path d="M6 4v20M6 14L20 6M6 14L20 22" stroke="#E8503A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>kyuc<sup>°</sup></span>
        </Link>
      </header>

      <main className={styles.main}>
        <article className={styles.article}>
          {/* Category badge */}
          <div className={styles.meta}>
            <span className={styles.category}>{categoryLabels[story.category] || story.category}</span>
            <span className={styles.date}>
              {new Date(story.created_at).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </span>
          </div>

          {/* Title */}
          <h1 className={styles.title}>{story.title}</h1>

          {/* Question */}
          {(story.question_en || story.question_vi) && (
            <blockquote className={styles.question}>
              &ldquo;{story.question_en || story.question_vi}&rdquo;
            </blockquote>
          )}

          {/* Cherished Photo */}
          {story.image_url && (
            <div className={styles.photoWrap}>
              <img
                src={story.image_url}
                alt={story.photo_caption || story.title}
                className={styles.photoImg}
              />
              {story.photo_caption && (
                <p className={styles.photoCaption}>
                  <span>📷</span>
                  {story.photo_caption}
                </p>
              )}
            </div>
          )}

          {/* Audio player */}
          {story.audio_url && (
            <div className={styles.audioWrap}>
              <p className={styles.audioLabel}>🎙 Voice Recording</p>
              <audio controls src={story.audio_url} className={styles.audio} />
            </div>
          )}

          {/* Story text */}
          {story.content_text && (
            <div className={styles.content}>
              {story.content_text.split('\n').map((para: string, i: number) =>
                para.trim() ? <p key={i}>{para}</p> : null
              )}
            </div>
          )}

          {/* Actions */}
          <div className={styles.actions}>
            {story.audio_url && (
              <a href={story.audio_url} download className="btn btn-ghost btn-sm">
                ↓ Download Audio
              </a>
            )}
            <Link href="/story/new" className="btn btn-primary btn-sm">
              + New Story
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
