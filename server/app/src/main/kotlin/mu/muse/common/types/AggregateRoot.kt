package mu.muse.common.types

abstract class AggregateRoot<T>(id: T, version: Version) : DomainEntity<T>(id, version)
