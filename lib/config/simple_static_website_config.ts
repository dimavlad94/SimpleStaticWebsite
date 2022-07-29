import { Stage, Region } from '../config/pipeline_config';
import { BasicConfig } from './basic_config';

export interface SimpleStaticWebsiteConfig {
    publicAccess: boolean;
}

export class SimpleStaticWebsiteConfiguration extends BasicConfig<SimpleStaticWebsiteConfig> {

    protected configure(): void {

        this.addConfig(Stage.BETA, Region.EU_WEST_1, {
            publicAccess: false
        });

        this.addConfig(Stage.PROD, Region.US_WEST_2, {
            publicAccess: true
        });

    }
}

export const SIMPLE_STATIC_WEBSITE_CONFIG = new SimpleStaticWebsiteConfiguration();
