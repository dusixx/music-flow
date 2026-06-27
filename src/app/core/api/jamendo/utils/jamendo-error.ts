export class JamendoError extends Error {
  constructor(
    message: string,
    public code?: number
  ) {
    super(message);
    this.name = 'JamendoError';
  }
}
