export class InstrumentId {
    private readonly value: number;

    private constructor(value: number) {
        this.value = value;
    }

    public static from(value: number) {
        return new InstrumentId(value)
    }

    public toNumberValue(): number {
        return this.value;
    }

    public toStringValue(): string {
        return this.value.toString();
    }
}