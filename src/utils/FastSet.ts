/**
 * A set that is also optimized for small integers.
 */
export class FastSet<T> {
  private readonly _set = new Set<T>();
  private readonly _map: Record<number, boolean> = {};

  constructor(values: readonly T[]) {
    for (const value of values) {
      this.add(value);
    }
  }

  has(value: T): boolean {
    if (this.isSmallInt(value)) {
      return Object.hasOwn(this._map, value);
    }

    return this._set.has(value);
  }

  add(value: T): void {
    if (this.isSmallInt(value)) {
      this._map[value] = true;
      return;
    }
    this._set.add(value);
  }

  private isSmallInt(value: unknown): value is number {
    return typeof value === 'number' && value >= 0 && value < 5000;
  }
}
