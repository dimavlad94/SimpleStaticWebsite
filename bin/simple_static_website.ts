#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SimpleStaticWebsiteStack } from '../lib/stacks/simple_static_website_stack';
import { PIPELINE_STAGES } from '../lib/config/pipeline_config';
import { getResourcePrefix } from '../lib/utils/naming_utils';
import { SIMPLE_STATIC_WEBSITE_CONFIG } from '../lib/config/simple_static_website_config';

const app = new cdk.App();

PIPELINE_STAGES.forEach(pipelineStage => {

    const prefix = getResourcePrefix(pipelineStage.type, pipelineStage.region);

    new SimpleStaticWebsiteStack(app, `${prefix}SimpleStaticWebsiteStack`, {
        stackName: `${prefix}SimpleStaticWebsiteStack`,
        prefix,
        websiteDomain: 'vladd-static-website',
        configuration: SIMPLE_STATIC_WEBSITE_CONFIG.getConfig(pipelineStage.type, pipelineStage.region),
        env: {
            account: pipelineStage.awsAccount,
            region: pipelineStage.region
        },
    });
});