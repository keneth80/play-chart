export interface ChartDemoConfig {
    containerId: string;
    width?: string;
    height?: string;
    title?: string;
    description?: string;
}

export abstract class ChartDemo {
    protected container: HTMLElement;
    protected config: Required<ChartDemoConfig>;

    constructor(config: ChartDemoConfig, autoInit = true) {
        this.config = {
            width: '600px',
            height: '600px',
            title: '',
            description: '',
            ...config
        };
        this.container = document.getElementById(config.containerId) || document.body;
        if (autoInit) this.init();
    }

    protected init() {
        this.createContainer();
        this.createHeader();
        this.createControls();
        this.createChart();
    }

    protected createContainer() {
        const container = document.createElement('div');
        container.className = 'chart-container';
        container.style.width = this.config.width;
        container.style.height = this.config.height;
        this.container.appendChild(container);
        return container;
    }

    protected createHeader() {
        if (this.config.title || this.config.description) {
            const header = document.createElement('div');
            header.className = 'chart-header';
            
            if (this.config.title) {
                const title = document.createElement('h2');
                title.textContent = this.config.title;
                header.appendChild(title);
            }
            
            if (this.config.description) {
                const description = document.createElement('p');
                description.textContent = this.config.description;
                header.appendChild(description);
            }
            
            this.container.insertBefore(header, this.container.firstChild);
        }
    }

    protected createControls() {
        const controls = document.createElement('div');
        controls.className = 'chart-controls';
        this.container.appendChild(controls);
        return controls;
    }

    protected addControlButton(text: string, onClick: () => void, className?: string) {        
        const button = document.createElement('button');
        button.textContent = text;
        if (className) {
            button.className = className;
        }
        button.onclick = onClick;
        this.container.querySelector('.chart-controls')?.appendChild(button);
    }

    protected addControlSelect(
        options: { value: string; label: string }[],
        onChange: (value: string) => void,
        className?: string
    ) {
        const select = document.createElement('select');
        if (className) {
            select.className = className;
        }
        
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.label;
            select.appendChild(optionElement);
        });
        
        select.onchange = (e) => {
            const target = e.target as HTMLSelectElement;
            onChange(target.value);
        };
        
        this.container.querySelector('.chart-controls')?.appendChild(select);
    }

    protected addControlInput(
        type: string,
        placeholder: string,
        onChange: (value: string) => void,
        className?: string
    ) {
        const input = document.createElement('input');
        input.type = type;
        input.placeholder = placeholder;
        if (className) {
            input.className = className;
        }
        
        input.onchange = (e) => {
            const target = e.target as HTMLInputElement;
            onChange(target.value);
        };
        
        this.container.querySelector('.chart-controls')?.appendChild(input);
    }

    protected showLoading() {
        const loader = document.createElement('div');
        loader.className = 'chart-loader';
        this.container.appendChild(loader);
    }

    protected hideLoading() {
        const loader = this.container.querySelector('.chart-loader');
        if (loader) {
            loader.remove();
        }
    }

    protected showError(message: string) {
        const error = document.createElement('div');
        error.className = 'chart-error';
        error.textContent = message;
        this.container.appendChild(error);
        
        setTimeout(() => {
            error.remove();
        }, 3000);
    }

    abstract createChart(): void;
    abstract destroy(): void;
} 