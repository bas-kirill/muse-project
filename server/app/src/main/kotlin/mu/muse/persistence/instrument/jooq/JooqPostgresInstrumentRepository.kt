package mu.muse.persistence.instrument.jooq

import mu.muse.codegen.jooq.public.tables.Instruments.Companion.INSTRUMENTS
import mu.muse.codegen.jooq.public.tables.pojos.Instruments
import mu.muse.common.types.Version
import mu.muse.domain.instrument.Country
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentBase64Photo
import mu.muse.domain.instrument.InstrumentId
import mu.muse.domain.instrument.InstrumentName
import mu.muse.domain.instrument.Manufacturer
import mu.muse.domain.instrument.ManufacturerDate
import mu.muse.domain.instrument.Material
import mu.muse.domain.instrument.ReleaseDate
import mu.muse.persistence.instrument.inmemory.matches
import mu.muse.usecase.access.instrument.InstrumentExtractor
import mu.muse.usecase.access.instrument.InstrumentPersister
import mu.muse.usecase.access.instrument.InstrumentRemover
import org.jooq.DSLContext
import org.jooq.impl.DSL.selectCount
import java.time.OffsetDateTime
import java.time.ZoneOffset

class JooqPostgresInstrumentRepository(
    private val dslContext: DSLContext,
) : InstrumentExtractor, InstrumentRemover, InstrumentPersister {

    override fun findAll(): List<Instrument> {
        val instrumentRecords = dslContext
            .selectFrom(INSTRUMENTS)
            .fetchInto(Instruments::class.java)
        return instrumentRecords.map { it.toInstrument() }
    }

    override fun findById(id: InstrumentId): Instrument? {
        val instrumentRecordResult = runCatching {
            dslContext
                .selectFrom(INSTRUMENTS)
                .fetchSingleInto(Instruments::class.java)
        }

        val instrumentRecordRaw = instrumentRecordResult.getOrNull() ?: return null
        return instrumentRecordRaw.toInstrument()
    }

    override fun findByIds(ids: List<InstrumentId>): List<Instrument> {
        if (ids.isEmpty()) {
            return emptyList()
        }
        val instrumentRecords = dslContext
            .selectFrom(INSTRUMENTS)
            .where(INSTRUMENTS.INSTRUMENT_ID.`in`(ids.map { it.toLongValue() }))
            .fetchInto(Instruments::class.java)
        return instrumentRecords.map { it.toInstrument() }
    }


    override fun findByCriteria(criteria: InstrumentExtractor.Criteria): List<Instrument> {
        val instrumentRecords = dslContext
            .selectFrom(INSTRUMENTS)
            .fetchInto(Instruments::class.java)
        val instruments = instrumentRecords.map { it.toInstrument() }
        return instruments.filter { it matches criteria }
    }

    override fun totalElements(): Long {
        return dslContext.fetchValue(selectCount().from(INSTRUMENTS)).toLong()
    }

    override fun removeInstrument(id: InstrumentId) {
        dslContext
            .deleteFrom(INSTRUMENTS)
            .where(INSTRUMENTS.INSTRUMENT_ID.eq(id.toLongValue()))
            .execute()
    }

    override fun save(instrument: Instrument) {
        dslContext.insertInto(
            INSTRUMENTS,
            INSTRUMENTS.INSTRUMENT_ID,
            INSTRUMENTS.INSTRUMENT_NAME,
            INSTRUMENTS.INSTRUMENT_I18N_CODE,
            INSTRUMENTS.MANUFACTURER_I18N_CODE,
            INSTRUMENTS.MANUFACTURER_DATE,
            INSTRUMENTS.RELEASE_DATE,
            INSTRUMENTS.COUNTRY_I18N_CODE,
            INSTRUMENTS.MATERIALS,
            INSTRUMENTS.IMAGE,
        )
            .values(
                instrument.id.toLongValue(),
                instrument.name.toStringValue(),
                instrument.type.i18nCode,
                instrument.manufacturerType.i18nCode,
                OffsetDateTime.ofInstant(instrument.manufactureDate.toInstantValue(), ZoneOffset.UTC),
                OffsetDateTime.ofInstant(instrument.releaseDate.toInstantValue(), ZoneOffset.UTC),
                instrument.country.i18nCode,
                instrument.materialTypes.map { it.i18nCode }.toTypedArray(),
                instrument.image.toStringValue(),
            )
            .onConflict(INSTRUMENTS.INSTRUMENT_ID)
            .doUpdate()
            .set(INSTRUMENTS.INSTRUMENT_NAME, instrument.name.toStringValue())
            .set(INSTRUMENTS.INSTRUMENT_I18N_CODE, instrument.type.i18nCode)
            .set(INSTRUMENTS.MANUFACTURER_I18N_CODE, instrument.manufacturerType.i18nCode)
            .set(INSTRUMENTS.MANUFACTURER_DATE, OffsetDateTime.ofInstant(instrument.manufactureDate.toInstantValue(), ZoneOffset.UTC))
            .set(INSTRUMENTS.RELEASE_DATE, OffsetDateTime.ofInstant(instrument.releaseDate.toInstantValue(), ZoneOffset.UTC))
            .set(INSTRUMENTS.COUNTRY_I18N_CODE, instrument.country.i18nCode)
            .set(INSTRUMENTS.MATERIALS, instrument.materialTypes.map { it.i18nCode }.toTypedArray())
            .set(INSTRUMENTS.IMAGE, instrument.image.toStringValue())
            .execute()
    }
}


fun Array<String?>.toBasicMaterials() = this.toList().map { Material.Type.fromI18nCode(it) }
fun Instruments.toInstrument() = Instrument(
    id = InstrumentId.from(this.instrumentId),
    name = InstrumentName.from(this.instrumentName),
    type = Instrument.Type.fromI18nCode(this.instrumentI18nCode),
    manufacturerType = Manufacturer.Type.fromI18nCode(this.manufacturerI18nCode),
    manufactureDate = ManufacturerDate.from(this.manufacturerDate!!.toInstant()),
    releaseDate = ReleaseDate.from(this.releaseDate!!.toInstant()),
    country = Country.fromI18nCode(this.countryI18nCode),
    materialTypes = this.materials!!.toBasicMaterials(),
    image = InstrumentBase64Photo.from(this.image),
    version = Version.new(),
)
