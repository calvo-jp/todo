/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export type Alias<T> = T | {_?: never};

export interface GenericObject {
	[key: string]: any;
}

export type Pretty<T extends GenericObject> = {
	[K in keyof T]: T[K];
} & {};

export type Assign<
	PropA extends GenericObject,
	PropB extends GenericObject,
> = Pretty<Omit<PropA, keyof PropB> & PropB>;
