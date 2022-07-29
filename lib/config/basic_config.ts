import { Region, Stage } from '../config/pipeline_config';

export abstract class BasicConfig<T> {
    private _config: Map<Stage, Map<Region, T>> = new Map();

    constructor() { this.configure(); }

    protected abstract configure(): void;

    protected addConfig(stage: Stage, region: Region, config: T): void {
        const existingConfig = this._config.get(stage);

        if (existingConfig) {
            existingConfig.set(region, config);
        } else {
            this._config.set(stage, new Map([[region, config]]));
        }
    }

    public getConfig(stage: Stage, region: Region): T {
        const configStageMap = this._config.get(stage);

        if (!configStageMap) {
            throw `Unknown Configuration for stage<${stage}>`;
        }
        const foundConfig = configStageMap.get(region);
        
        if (!foundConfig) {
            throw `Unknown Configuration for stage<${stage}> and region<${region}>`;
        }

        return foundConfig;
    }
}
