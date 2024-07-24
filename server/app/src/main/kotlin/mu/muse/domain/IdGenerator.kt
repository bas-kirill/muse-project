package mu.muse.domain

fun interface IdGenerator<T> {
    fun generate(): T
}
