export class Addon {
  constructor(
    public readonly id: string,
    public name: string,
    public totalAmount: number,
    public freeAmount: number
  ) {}
}
