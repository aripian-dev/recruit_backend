import {MongooseModuleOptions} from '@nestjs/mongoose';

export function createMongooseOptions(uriPath: string): MongooseModuleOptions {
	return {
		uri: uriPath,
		useUnifiedTopology: true,
		useNewUrlParser: true,
	}
}