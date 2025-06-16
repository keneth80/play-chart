export interface ChartDemoConfig {
    containerId: string;
    width?: string;
    height?: string;
    title?: string;
    description?: string;
}
export declare abstract class ChartDemo {
    protected container: HTMLElement;
    protected config: Required<ChartDemoConfig>;
    constructor(config: ChartDemoConfig);
    protected init(): void;
    protected createContainer(): HTMLDivElement;
    protected createHeader(): void;
    protected createControls(): HTMLDivElement;
    protected addControlButton(text: string, onClick: () => void, className?: string): void;
    protected addControlSelect(options: {
        value: string;
        label: string;
    }[], onChange: (value: string) => void, className?: string): void;
    protected addControlInput(type: string, placeholder: string, onChange: (value: string) => void, className?: string): void;
    protected showLoading(): void;
    protected hideLoading(): void;
    protected showError(message: string): void;
    abstract createChart(): void;
    abstract destroy(): void;
}
//# sourceMappingURL=chart-base.d.ts.map