package mu.muse.common.persistence

data class Page<T>(
    val content: List<T>,
    val contentSize: Long,
    val pageSize: Long,
    val pageNumber: Long,
    val totalElements: Long,
    val totalPages: Long,
)
