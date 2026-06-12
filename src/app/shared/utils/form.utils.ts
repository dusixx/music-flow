import { effect, Signal } from '@angular/core';

interface ResetterProps {
  formModel: Signal<unknown>;
  error: Signal<string>;
  clearError: () => void;
}

export const getServerErrorResetter = ({ formModel, error, clearError }: ResetterProps) => {
  let lastSubmittedSnapshot = '';

  effect(() => {
    if (error() && lastSubmittedSnapshot !== JSON.stringify(formModel())) {
      clearError();
    }
  });
  return {
    markAsSubmitted() {
      lastSubmittedSnapshot = JSON.stringify(formModel());
    },
  };
};
