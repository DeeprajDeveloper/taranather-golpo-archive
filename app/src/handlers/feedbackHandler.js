export const FEEDBACK_TYPES = {
  feedback: {
    value: 'feedback',
    label: 'General feedback',
  },
  story: {
    value: 'story',
    label: 'Story recommendation',
  },
};

export const FEEDBACK_CONFIG = {
  email: import.meta.env.VITE_FEEDBACK_EMAIL || '',
  subjectPrefix: 'Taranath Golpo Sangroho',
};

export function createInitialFeedbackForm() {
  return {
    type: FEEDBACK_TYPES.story.value,
    name: '',
    contactEmail: '',
    storyTitleBn: '',
    storyTitleEn: '',
    authorName: '',
    youtubeUrl: '',
    message: '',
  };
}

export function updateFeedbackField(form, field, value) {
  return { ...form, [field]: value };
}

export function validateFeedbackForm(form) {
  const errors = {};

  if (!form.message.trim()) {
    errors.message = 'Please add a message or story details.';
  }

  if (form.type === FEEDBACK_TYPES.story.value) {
    const hasTitle = form.storyTitleBn.trim() || form.storyTitleEn.trim();
    if (!hasTitle && !form.message.trim()) {
      errors.storyTitleBn = 'Add a story title or describe it in the message.';
    }
  }

  if (form.contactEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail.trim())) {
    errors.contactEmail = 'Enter a valid email address.';
  }

  if (form.youtubeUrl.trim()) {
    try {
      const url = new URL(form.youtubeUrl.trim());
      if (!url.hostname.includes('youtube.com') && !url.hostname.includes('youtu.be')) {
        errors.youtubeUrl = 'Link must be a YouTube URL.';
      }
    } catch {
      errors.youtubeUrl = 'Enter a valid YouTube URL.';
    }
  }

  return errors;
}

export function hasFeedbackErrors(errors) {
  return Object.keys(errors).length > 0;
}

function formatTypeLabel(type) {
  return type === FEEDBACK_TYPES.story.value
    ? FEEDBACK_TYPES.story.label
    : FEEDBACK_TYPES.feedback.label;
}

export function buildFeedbackEmailBody(form) {
  const lines = [
    `Type: ${formatTypeLabel(form.type)}`,
    '',
  ];

  if (form.name.trim()) lines.push(`Name: ${form.name.trim()}`);
  if (form.contactEmail.trim()) lines.push(`Reply-to: ${form.contactEmail.trim()}`);

  if (form.type === FEEDBACK_TYPES.story.value) {
    lines.push('');
    lines.push('--- Story details ---');
    if (form.storyTitleBn.trim()) lines.push(`Bengali title: ${form.storyTitleBn.trim()}`);
    if (form.storyTitleEn.trim()) lines.push(`English title: ${form.storyTitleEn.trim()}`);
    if (form.authorName.trim()) lines.push(`Author / narrator: ${form.authorName.trim()}`);
    if (form.youtubeUrl.trim()) lines.push(`YouTube: ${form.youtubeUrl.trim()}`);
  }

  lines.push('');
  lines.push('--- Message ---');
  lines.push(form.message.trim());

  return lines.join('\n');
}

export function buildFeedbackMailtoUrl(form) {
  const subject = encodeURIComponent(
    `${FEEDBACK_CONFIG.subjectPrefix} — ${formatTypeLabel(form.type)}`,
  );
  const body = encodeURIComponent(buildFeedbackEmailBody(form));
  const recipient = FEEDBACK_CONFIG.email
    ? encodeURIComponent(FEEDBACK_CONFIG.email)
    : '';

  return recipient
    ? `mailto:${recipient}?subject=${subject}&body=${body}`
    : `mailto:?subject=${subject}&body=${body}`;
}

export async function submitFeedback(form) {
  const errors = validateFeedbackForm(form);
  if (hasFeedbackErrors(errors)) {
    return { ok: false, errors };
  }

  const mailtoUrl = buildFeedbackMailtoUrl(form);
  const bodyText = buildFeedbackEmailBody(form);

  window.location.href = mailtoUrl;

  try {
    await navigator.clipboard.writeText(bodyText);
    return { ok: true, copied: true };
  } catch {
    return { ok: true, copied: false };
  }
}

export function getFeedbackSuccessMessage(copied) {
  if (FEEDBACK_CONFIG.email) {
    return copied
      ? 'Opening your email app. A copy was saved to your clipboard.'
      : 'Opening your email app to send your message.';
  }

  return copied
    ? 'Your message was copied. Paste it into an email to the site maintainer.'
    : 'Your email app should open — choose a recipient and send.';
}
