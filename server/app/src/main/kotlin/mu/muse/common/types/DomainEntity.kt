package mu.muse.common.types

open class DomainEntity<T> protected constructor(
    val id: T,
    var version: Version,
) {

    private var events = ArrayList<DomainEvent>()

    protected fun addEvent(event: DomainEvent) {
        if (events.isEmpty()) {
            version = version.next()
        }
        events.add(event)
    }

    fun popEvents(): List<DomainEvent> {
        val res = events
        events = ArrayList()
        return res
    }
}
