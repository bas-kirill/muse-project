package mu.muse.domain.instrument

import mu.muse.common.types.ValueObject
import java.time.Instant

data class ReleaseDate internal constructor(private val value: Instant) : ValueObject {

    fun toInstantValue() = value

    fun inRange(from: Instant?, to: Instant?): Boolean {
        return (from == null || from.isBefore(value)) &&
            (to == null || value.isBefore(to))
    }

    companion object {
        fun from(value: Instant): ReleaseDate {
            return ReleaseDate(value)
        }
    }
}
