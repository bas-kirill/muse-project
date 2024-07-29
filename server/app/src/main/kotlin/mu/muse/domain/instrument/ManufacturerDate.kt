package mu.muse.domain.instrument

import mu.muse.common.annotations.ValueObject
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId

@ValueObject
data class ManufacturerDate internal constructor(private val value: Instant) {

    fun toInstantValue() = value

    fun inRangeInclusive(from: ManufacturerDate?, to: ManufacturerDate?): Boolean {
        return (from == null || from.toInstantValue().isBefore(value) || from.toInstantValue() == value) &&
            (to == null || value.isBefore(to.toInstantValue()) || value == to.toInstantValue())
    }

    companion object {
        fun from(value: Instant): ManufacturerDate {
            return ManufacturerDate(value)
        }

        fun from(value: LocalDate): ManufacturerDate {
            return ManufacturerDate(value.atStartOfDay(ZoneId.systemDefault()).toInstant())
        }
    }
}
