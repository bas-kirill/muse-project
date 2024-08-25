package mu.muse.persistence.instrument.postgres

import mu.muse.common.types.Version
import mu.muse.domain.instrument.Country
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentId
import mu.muse.domain.instrument.InstrumentName
import mu.muse.domain.instrument.InstrumentBase64Photo
import mu.muse.domain.instrument.ManufacturerType
import mu.muse.domain.instrument.ManufacturerDate
import mu.muse.domain.instrument.MaterialType
import mu.muse.domain.instrument.ReleaseDate
import mu.muse.persistence.instrument.inmemory.matches
import mu.muse.usecase.access.instrument.InstrumentExtractor
import mu.muse.usecase.access.instrument.InstrumentPersister
import mu.muse.usecase.access.instrument.InstrumentRemover
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import java.sql.ResultSet
import java.sql.Timestamp

class PostgresInstrumentRepository(
    private val namedTemplate: NamedParameterJdbcTemplate,
) : InstrumentExtractor, InstrumentRemover, InstrumentPersister {

    override fun findAll(): List<Instrument> {
        val sql = """
            select
              instrument_id,
              instrument_name,
              instrument_type,
              manufacturer_name,
              manufacturer_date,
              release_date,
              country,
              materials
            from instruments
        """.trimIndent()
        return namedTemplate.query(sql) { rs, _ -> rs.toInstrument() }
    }

    override fun findById(id: InstrumentId): Instrument? {
        val sql = """
            select
              instrument_id,
              instrument_name,
              instrument_type,
              manufacturer_name,
              manufacturer_date,
              release_date,
              country,
              materials,
              image
            from instruments
            where instrument_id = :instrument_id
        """.trimIndent()
        val params = mapOf("instrument_id" to id.toLongValue())
        return namedTemplate.queryForObject(sql, params) { rs, _ -> rs.toInstrument() }
    }

    override fun findByIds(ids: List<InstrumentId>): List<Instrument> {
        if (ids.isEmpty()) {
            return emptyList()
        }

        val sql = """
            select
              instrument_id,
              instrument_name,
              instrument_type,
              manufacturer_name,
              manufacturer_date,
              release_date,
              country,
              materials,
              image
            from instruments
            where instrument_id in (:instrument_ids)
        """.trimIndent()

        val params = mapOf("instrument_ids" to ids.map { it.toLongValue() })
        return namedTemplate.query(sql, params) { rs, _ -> rs.toInstrument() }
    }


    override fun findByCriteria(criteria: InstrumentExtractor.Criteria): List<Instrument> {
        val sql = """
            select
              instrument_id,
              instrument_name,
              instrument_type,
              manufacturer_name,
              manufacturer_date,
              release_date,
              country,
              materials,
              image
            from instruments
        """.trimIndent()
        val instruments = namedTemplate.query(sql) { rs, _ -> rs.toInstrument() }
        return instruments.filter { it matches criteria }
    }

    override fun totalElements(): Long {
        val sql = "select count(*) from instruments"
        return namedTemplate.queryForObject(sql, mapOf<String, Any>(), Long::class.java)!!
    }

    override fun removeInstrument(id: InstrumentId) {
        val sql = "delete from instruments where instrument_id = :instrument_id"
        val params = mapOf(
            "instrument_id" to id.toLongValue(),
        )
        namedTemplate.update(sql, params)
    }

    override fun save(instrument: Instrument) {
        val sql = """
            insert into instruments (
                instrument_id,
                instrument_name,
                instrument_type,
                manufacturer_name,
                manufacturer_date,
                release_date,
                country,
                materials,
                image
            )
            values (
              :instrument_id,
              :instrument_name,
              :instrument_type,
              :manufacturer_name,
              :manufacturer_date,
              :release_date,
              :country,
              :materials,
              :image
            )
            on conflict (instrument_id) do update
            set
              instrument_name = :instrument_name,
              instrument_type = :instrument_type,
              manufacturer_name = :manufacturer_name,
              manufacturer_date = :manufacturer_date,
              release_date = :release_date,
              country = :country,
              materials = :materials,
              image = :image
        """.trimIndent()
        val params = mapOf(
            "instrument_id" to instrument.id.toLongValue(),
            "instrument_name" to instrument.name.toStringValue(),
            "instrument_type" to instrument.type.name,
            "manufacturer_name" to instrument.manufacturerType.realName,
            "manufacturer_date" to Timestamp.from(instrument.manufactureDate.toInstantValue()),
            "release_date" to Timestamp.from(instrument.releaseDate.toInstantValue()),
            "country" to instrument.country.realName,
            "materials" to instrument.materialTypes.map { it.realName }.toTypedArray(),
            "image" to instrument.image.toStringValue(),
        )
        namedTemplate.update(sql, params)
    }
}

fun Array<String>.toBasicMaterials() = this.toList().map { MaterialType.from(it) }
fun ResultSet.toInstrument() = Instrument(
    id = InstrumentId.from(this.getLong("instrument_id")),
    name = InstrumentName.from(this.getString("instrument_name")),
    type = Instrument.Type.valueOf(this.getString("instrument_type")),
    manufacturerType = ManufacturerType.from(this.getString("manufacturer_name")),
    manufactureDate = ManufacturerDate.from(this.getTimestamp("manufacturer_date").toInstant()),
    releaseDate = ReleaseDate.from(this.getTimestamp("release_date").toInstant()),
    country = Country.from(this.getString("country")),
    materialTypes = (this.getArray("materials").getArray() as Array<String>).toBasicMaterials(),
    image = InstrumentBase64Photo.from(this.getString("image")),
    version = Version.new(),
)
