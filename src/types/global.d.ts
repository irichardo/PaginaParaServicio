declare namespace jest {
    interface Matchers<R> {
      mockResolvedValue(value: any): R;
    }
  }