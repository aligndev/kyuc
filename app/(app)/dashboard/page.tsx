import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import styles from './dashboard.module.css';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  // Fetch stories
  const { data: stories } = await supabase
    .from('stories')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const displayName = user.user_metadata?.display_name || user.email?.split('@')[0] || 'Friend';

  return (
    <div className={styles.page}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.logo}>
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
            <path d="M6 4v20M6 14L20 6M6 14L20 22" stroke="#E8503A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>kyuc<sup>°</sup></span>
        </Link>

        <nav className={styles.nav}>
          <Link href="/dashboard" className={`${styles.navItem} ${styles.navActive}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            My Stories
          </Link>
          <Link href="/story/new" className={styles.navItem}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            New Story
          </Link>
          <Link href="/family" className={styles.navItem}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
            </svg>
            Family Space
          </Link>
          <Link href="/profile" className={styles.navItem}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            Profile
          </Link>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>{displayName[0].toUpperCase()}</div>
            <div>
              <p className={styles.userName}>{displayName}</p>
              <p className={styles.userEmail}>{user.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className={styles.main}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.greeting}>Hello, {displayName} 👋</h1>
            <p className={styles.greetingSub}>
              {stories?.length
                ? `You have preserved ${stories.length} ${stories.length === 1 ? 'story' : 'stories'}. Keep it going!`
                : 'Start capturing your first family memory today.'}
            </p>
          </div>
          <Link href="/story/new" className="btn btn-primary">
            + New Story
          </Link>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>{stories?.length ?? 0}</span>
            <span className={styles.statLabel}>Stories</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>
              {stories?.filter(s => s.audio_url).length ?? 0}
            </span>
            <span className={styles.statLabel}>Audio Recordings</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>1</span>
            <span className={styles.statLabel}>Family Member</span>
          </div>
        </div>

        {/* Stories grid */}
        {!stories || stories.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>📖</div>
            <h3 className={styles.emptyTitle}>No stories preserved yet</h3>
            <p className={styles.emptyDesc}>
              A single thoughtful question is all it takes. Pick a prompt and let the memories return.
            </p>
            <Link href="/story/new" className="btn btn-primary">
              Create First Story
            </Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {stories.map(story => (
              <Link href={`/story/${story.id}`} key={story.id} className={styles.storyCard}>
                {story.image_url && (
                  <div className={styles.cardThumb}>
                    <img
                      src={story.image_url}
                      alt={story.title}
                      className={styles.cardThumbImg}
                      loading="lazy"
                    />
                  </div>
                )}
                <div className={styles.storyMeta}>
                  <span className={styles.storyCategory}>{story.category}</span>
                  <span className={styles.storyDate}>
                    {new Date(story.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <h3 className={styles.storyTitle}>{story.title}</h3>
                {(story.question_en || story.question_vi) && (
                  <p className={styles.storyQuestion}>
                    &ldquo;{story.question_en || story.question_vi}&rdquo;
                  </p>
                )}
                {story.content_text && (
                  <p className={styles.storyPreview}>
                    {story.content_text.slice(0, 120)}…
                  </p>
                )}
                <div className={styles.storyFooter}>
                  {story.audio_url && (
                    <span className={styles.audioTag}>🎙 Audio recorded</span>
                  )}
                  <span className={styles.readMore}>Read story →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
