package mu.muse.common.persistence

data class Page<T>(
    val content: Collection<T>,
    val contentSize: Int,
    val pageSize: Int,
    val pageNumber: Int,
    val totalElements: Int,
    val totalPages: Int,
)
