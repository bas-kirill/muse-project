package mu.muse.domain.instrument

import mu.muse.common.annotations.ValueObject
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId

@ValueObject
data class ReleaseDate internal constructor(private val value: Instant) {

    fun toInstantValue() = value

    fun inRangeInclusive(from: ReleaseDate?, to: ReleaseDate?): Boolean {
        return (from == null || from.toInstantValue().isBefore(value) || from.toInstantValue() == value) &&
            (to == null || value.isBefore(to.toInstantValue()) || value == to.toInstantValue())
    }

    companion object {
        fun from(value: Instant): ReleaseDate {
            return ReleaseDate(value)
        }

        fun from(value: LocalDate): ReleaseDate {
            return ReleaseDate(value.atStartOfDay(ZoneId.systemDefault()).toInstant())
        }
    }
}
