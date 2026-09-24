'use client';

import { useState, useRef, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { getRandomQuestion, categoryMeta, type Category, type Language } from '@/lib/questions';
import PhotoUploader from '@/components/story/PhotoUploader';
import styles from './new.module.css';

function NewStoryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCat = (searchParams.get('category') as Category) || 'roots';

  const [category, setCategory] = useState<Category>(initialCat);
  const [lang, setLang] = useState<Language>('en');
  const [question, setQuestion] = useState(() => getRandomQuestion(initialCat));
  const [title, setTitle] = useState('');
  const [storyText, setStoryText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoCaption, setPhotoCaption] = useState('');
  const [saving, setSaving] = useState(false);
  const [step, setStep] = useState<'category' | 'record' | 'save'>('category');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleCategorySelect = (cat: Category) => {
    setCategory(cat);
    setQuestion(getRandomQuestion(cat));
    setStep('record');
  };

  const handleNextQuestion = () => {
    setQuestion(getRandomQuestion(category));
    setStoryText('');
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(t => t.stop());
      };

      recorder.start(100);
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = setInterval(() => setRecordingTime(t => t + 1), 1000);
    } catch {
      alert('Could not access microphone. Please check browser permissions.');
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [isRecording]);

  const handleSave = async () => {
    if (!storyText.trim() && !audioBlob && !photoFile) {
      alert('Please write a story, record audio, or attach a photo.');
      return;
    }
    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/login'); return; }

    let audio_url = null;
    let image_url = null;

    // Upload audio if exists
    if (audioBlob) {
      const fileName = `${user.id}/${Date.now()}.webm`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('audio')
        .upload(fileName, audioBlob, { contentType: 'audio/webm' });
      if (!uploadError && uploadData) {
        const { data: urlData } = supabase.storage.from('audio').getPublicUrl(uploadData.path);
        audio_url = urlData.publicUrl;
      }
    }

    // Upload photo if exists
    if (photoFile) {
      const ext = photoFile.name.split('.').pop() || 'webp';
      const photoPath = `${user.id}/${Date.now()}.${ext}`;
      const { data: photoData, error: photoError } = await supabase.storage
        .from('photos')
        .upload(photoPath, photoFile, { contentType: photoFile.type });
      if (!photoError && photoData) {
        const { data: urlData } = supabase.storage.from('photos').getPublicUrl(photoData.path);
        image_url = urlData.publicUrl;
      }
    }

    // Save story
    const { data: story, error } = await supabase.from('stories').insert({
      user_id: user.id,
      title: title || question[lang].slice(0, 60),
      question_en: question.en,
      question_vi: question.vi,
      category,
      content_text: storyText,
      audio_url,
      image_url,
      photo_caption: photoCaption || null,
      language: lang,
    }).select().single();

    if (error) {
      alert('Could not save story. Please try again.');
    } else if (story) {
      router.push(`/story/${story.id}`);
    }
    setSaving(false);
  };

  const meta = categoryMeta[category];

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <Link href="/dashboard" className={styles.back}>
          ← Back to Stories
        </Link>
        <Link href="/" className={styles.logo}>
          <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
            <path d="M6 4v20M6 14L20 6M6 14L20 22" stroke="#E8503A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>kyuc<sup>°</sup></span>
        </Link>
      </header>

      <main className={styles.main}>
        {/* Step 1: Choose Category */}
        {step === 'category' && (
          <div className={styles.stepWrap}>
            <p className="section-label">Begin your archive</p>
            <h1 className={styles.stepTitle}>What would you like to explore?</h1>
            <p className={styles.stepDesc}>Choose a theme to discover thoughtful prompts.</p>

            <div className={styles.categoryGrid}>
              {(Object.keys(categoryMeta) as Category[]).map(cat => {
                const m = categoryMeta[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={styles.categoryCard}
                    style={{ background: m.color }}
                  >
                    <span className={styles.catNumber}>{m.number}</span>
                    <h3 className={styles.catLabel}>{m.label.en}</h3>
                    <p className={styles.catTagline}>{m.tagline.en}</p>
                    <p className={styles.catSample}>{m.sampleQuestion.en}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Record */}
        {step === 'record' && (
          <div className={styles.recordWrap}>
            <div className={styles.recordLeft}>
              <p className="section-label" style={{ color: 'var(--color-brand)' }}>
                {meta.number} — {meta.label.en.toUpperCase()}
              </p>
              <h2 className={styles.recordTitle}>
                Capture their story.
              </h2>
              <p className={styles.recordDesc}>
                Write it down, record their voice, or both.
              </p>

              {/* Language */}
              <div className={styles.langRow}>
                <button
                  className={lang === 'en' ? styles.langActive : styles.langBtn}
                  onClick={() => setLang('en')}
                >🇬🇧 English</button>
                <button
                  className={lang === 'vi' ? styles.langActive : styles.langBtn}
                  onClick={() => setLang('vi')}
                >🇻🇳 Tiếng Việt</button>
              </div>

              <button
                onClick={() => setStep('category')}
                className={styles.changeCategory}
              >
                ← Change theme
              </button>
            </div>

            <div className={styles.recordCard}>
              {/* Question */}
              <div className={styles.questionBox}>
                <p className={styles.questionLabel}>{meta.label[lang]}</p>
                <h3 className={styles.question}>{question[lang]}</h3>
                <button onClick={handleNextQuestion} className={styles.nextQ}>
                  Another prompt ↻
                </button>
              </div>

              {/* Title */}
              <div>
                <label className="form-label" htmlFor="story-title">Story Title (optional)</label>
                <input
                  id="story-title"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Grandma's secret recipe..."
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>

              {/* Text */}
              <div>
                <label className="form-label">Written Story</label>
                <textarea
                  className="form-textarea"
                  placeholder="I remember when..."
                  value={storyText}
                  onChange={e => setStoryText(e.target.value)}
                  rows={6}
                />
              </div>

              {/* Photo Attachment */}
              <PhotoUploader
                onPhotoSelected={setPhotoFile}
                caption={photoCaption}
                onCaptionChange={setPhotoCaption}
              />

              {/* Record */}
              <div className={styles.recordControls}>
                <button
                  className={`btn ${isRecording ? styles.recordingBtn : 'btn-primary'}`}
                  onClick={isRecording ? stopRecording : startRecording}
                >
                  {isRecording ? (
                    <><span className={styles.recDot} /> Stop recording — {formatTime(recordingTime)}</>
                  ) : (
                    <><span className={styles.recDotWhite} /> Record story</>
                  )}
                </button>
                {!isRecording && recordingTime > 0 && (
                  <span className={styles.recorded}>✓ Recorded {formatTime(recordingTime)}</span>
                )}
              </div>

              {audioUrl && (
                <audio controls src={audioUrl} style={{ width: '100%', marginTop: '0.5rem' }} />
              )}

              <button
                className="btn btn-secondary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? 'Saving…' : '💾 Save to Family Archive'}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function NewStoryPage() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading…</div>}>
      <NewStoryContent />
    </Suspense>
  );
}
