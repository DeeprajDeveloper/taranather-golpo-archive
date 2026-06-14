import { useCallback, useState } from 'react';
import {
  createInitialFeedbackForm,
  getFeedbackSuccessMessage,
  hasFeedbackErrors,
  submitFeedback,
  updateFeedbackField,
  validateFeedbackForm,
} from '../handlers/feedbackHandler';
import { useDrawerAnimation } from './useDrawerAnimation';

export function useFeedbackModal() {
  const [form, setForm] = useState(createInitialFeedbackForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const resetModalState = useCallback(() => {
    setStatus('idle');
    setStatusMessage('');
    setErrors({});
  }, []);

  const drawer = useDrawerAnimation({ onClosed: resetModalState });

  const open = useCallback(() => {
    resetModalState();
    drawer.open();
  }, [drawer, resetModalState]);

  const close = useCallback(() => {
    drawer.close();
  }, [drawer]);

  const reset = useCallback(() => {
    setForm(createInitialFeedbackForm());
    resetModalState();
  }, [resetModalState]);

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

  return {
    isOpen: drawer.isVisible,
    isVisible: drawer.isVisible,
    isActive: drawer.isActive,
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
