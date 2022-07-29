import { Stack, StackProps } from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3Dpl from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import { SimpleStaticWebsiteConfig } from '../config/simple_static_website_config';

export interface SimpleStaticWebsiteStackProps extends StackProps {
    /**
     * Will prefix Stack and it's resources with this value.
     */
    prefix?: string;

    /**
     * Domain that will be used for the bucket. If prefix is specified, the final
     * bucket domain will contain it.
     */
    websiteDomain: string;

    /**
     * Configuration specific to Pipeline Stage.
     */
    configuration: SimpleStaticWebsiteConfig;
}

export class SimpleStaticWebsiteStack extends Stack {
  private readonly _props: SimpleStaticWebsiteStackProps

  private readonly _bucket: s3.Bucket
  private readonly _bucketDpl: s3Dpl.BucketDeployment

  constructor (scope: Construct, id: string, props: SimpleStaticWebsiteStackProps) {
    super(scope, id, props)
    this._props = props

    const bucketId = this._props.prefix + this.stackName + 'Bucket'
    const websiteDomain = this._props.prefix + this._props.websiteDomain

    this._bucket = this.buildStaticWebsiteBucket(bucketId, websiteDomain, this._props)
    this._bucketDpl = this.buildStaticWebsiteBucketDeployment(`${bucketId}Dpl`, this._bucket)
  }

  private buildStaticWebsiteBucket (bucketId: string, bucketName: string, props: SimpleStaticWebsiteStackProps): s3.Bucket {
    return new s3.Bucket(this, bucketId, {
      bucketName,
      publicReadAccess: props.configuration.publicAccess,
      websiteIndexDocument: 'index.html'
    })
  }

  private buildStaticWebsiteBucketDeployment (bucketDplId: string, destinationBucket: s3.Bucket): s3Dpl.BucketDeployment {
    return new s3Dpl.BucketDeployment(this, bucketDplId, {
      sources: [
        s3Dpl.Source.asset('assets/code/static-website')
      ],
      destinationBucket
    })
  }
}
