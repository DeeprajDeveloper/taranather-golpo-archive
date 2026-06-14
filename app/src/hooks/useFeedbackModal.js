import { useCallback, useEffect, useState } from 'react';
import {
  createInitialFeedbackForm,
  getFeedbackSuccessMessage,
  hasFeedbackErrors,
  submitFeedback,
  updateFeedbackField,
  validateFeedbackForm,
} from '../handlers/feedbackHandler';

export function useFeedbackModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(createInitialFeedbackForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const open = useCallback(() => {
    setIsOpen(true);
    setStatus('idle');
    setStatusMessage('');
    setErrors({});
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setStatus('idle');
    setStatusMessage('');
    setErrors({});
  }, []);

  const reset = useCallback(() => {
    setForm(createInitialFeedbackForm());
    setErrors({});
    setStatus('idle');
    setStatusMessage('');
  }, []);

  const updateField = useCallback((field, value) => {
    setForm((current) => updateFeedbackField(current, field, value));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }, []);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    const validationErrors = validateFeedbackForm(form);

    if (hasFeedbackErrors(validationErrors)) {
      setErrors(validationErrors);
      setStatus('error');
      return;
    }

    const result = await submitFeedback(form);

    if (!result.ok) {
      setErrors(result.errors);
      setStatus('error');
      return;
    }

    setStatus('success');
    setStatusMessage(getFeedbackSuccessMessage(result.copied));
    setForm(createInitialFeedbackForm());
  }, [form]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') close();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, close]);

  return {
    isOpen,
    form,
    errors,
    status,
    statusMessage,
    open,
    close,
    reset,
    updateField,
    handleSubmit,
    isStoryRecommendation: form.type === 'story',
  };
}
