export enum Region {
    US_WEST_2 = 'us-west-2',
    EU_WEST_1 = 'eu-west-1'
}

export enum Stage {
    BETA = 'beta',
    PROD = 'prod'
}

export interface PipelineStage {
    type: Stage;
    region: Region;
    name: string;
    awsAccount: string;
}

export const PIPELINE_STAGES: PipelineStage[] = [
    {
        type: Stage.BETA,
        region: Region.EU_WEST_1,
        name: `${Stage.BETA}-${Region.EU_WEST_1}`,
        awsAccount: '<REDACTED>'
    },
    {
        type: Stage.PROD,
        region: Region.US_WEST_2,
        name: `${Stage.PROD}-${Region.US_WEST_2}`,
        awsAccount: '<REDACTED>'
    }
];
