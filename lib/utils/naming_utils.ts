import { Region, Stage } from "../config/pipeline_config";

export function getResourcePrefix(stage: Stage, region: Region, projectAcronym?: string): string {
    if(projectAcronym && projectAcronym.length > 0) {
        return `${projectAcronym}-${stage}-${region}-`;
    }

    return `${stage}-${region}-`;
}