export class ForbiddenError extends Error {
  constructor(message?: string) {
    super(message);
    this.message = message ?? 'Forbidden access';
  }
}
