export const apiVersion = '2025-06-14';

export const dataset = 'production';

export const projectId = 'wk0p7c5o';

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
