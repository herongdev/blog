/** Retain only the best K entries; the root is the worst retained result. */
export class RankedResults<T extends { id: string }> {
  private heap: T[] = [];
  private positions = new Map<string, number>();
  constructor(
    private limit: number,
    private compare: (a: T, b: T) => number,
  ) {}
  add(value: T) {
    const position = this.positions.get(value.id);
    if (position !== undefined) {
      if (this.compare(value, this.heap[position]) >= 0) return;
      this.heap[position] = value;
      this.down(position);
    } else if (this.heap.length < this.limit) {
      const index = this.heap.length;
      this.heap.push(value);
      this.positions.set(value.id, index);
      this.up(index);
    } else if (this.compare(value, this.heap[0]) < 0) {
      this.positions.delete(this.heap[0].id);
      this.heap[0] = value;
      this.positions.set(value.id, 0);
      this.down(0);
    }
  }
  sorted() {
    return [...this.heap].sort(this.compare);
  }
  private swap(a: number, b: number) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
    this.positions.set(this.heap[a].id, a);
    this.positions.set(this.heap[b].id, b);
  }
  private up(index: number) {
    while (index > 0) {
      const parent = (index - 1) >> 1;
      if (this.compare(this.heap[index], this.heap[parent]) <= 0) return;
      this.swap(index, parent);
      index = parent;
    }
  }
  private down(index: number) {
    for (;;) {
      let worst = index;
      for (const child of [index * 2 + 1, index * 2 + 2])
        if (
          child < this.heap.length &&
          this.compare(this.heap[child], this.heap[worst]) > 0
        )
          worst = child;
      if (worst === index) return;
      this.swap(index, worst);
      index = worst;
    }
  }
}
