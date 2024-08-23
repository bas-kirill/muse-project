package mu.muse.persistence.instrument.postgres

import mu.muse.common.types.Version
import mu.muse.domain.instrument.Country
import mu.muse.domain.instrument.Instrument
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
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import org.springframework.jdbc.support.GeneratedKeyHolder
import java.sql.ResultSet

class PostgresInstrumentRepository(
    private val namedTemplate: NamedParameterJdbcTemplate,
) : InstrumentExtractor, InstrumentRemover, InstrumentPersister {

    private val keyHolder = GeneratedKeyHolder()

    override fun findAll(): List<Instrument> {
        val sql = "select " +
            "instrument_id, " +
            "instrument_name, " +
            "instrument_type, " +
            "manufacturer_name, " +
            "manufacturer_date, " +
            "release_date, " +
            "country, " +
            "materials " +
            "from instruments"
        return namedTemplate.query(sql) { rs, _ -> rs.toInstrument() }
    }

    override fun findById(id: InstrumentId): Instrument? {
        val sql = "select " +
            "instrument_id, " +
            "instrument_name, " +
            "instrument_type, " +
            "manufacturer_name, " +
            "manufacturer_date, " +
            "release_date, " +
            "country, " +
            "materials " +
            "from instruments " +
            "where instrument_id = :instrument_id"
        val params = MapSqlParameterSource().addValue("instrument_id", id.toLongValue())
        return namedTemplate.queryForObject(sql, params) { rs, _ -> rs.toInstrument() }
    }

    override fun findByIds(ids: List<InstrumentId>): List<Instrument> {
        val sql = "select " +
            "instrument_id, " +
            "instrument_name, " +
            "instrument_type, " +
            "manufacturer_name, " +
            "manufacturer_date, " +
            "release_date, " +
            "country, " +
            "materials " +
            "from instruments " +
            "where instrument_id in :instrument_ids"
        val params = MapSqlParameterSource().addValue("instrument_ids", ids)
        return namedTemplate.query(sql, params) { rs, _ -> rs.toInstrument() }
    }

    override fun findByCriteria(criteria: InstrumentExtractor.Criteria): List<Instrument> {
        val sql = "select " +
            "instrument_id, " +
            "instrument_name, " +
            "instrument_type, " +
            "manufacturer_name, " +
            "manufacturer_date, " +
            "release_date, " +
            "country, " +
            "materials " +
            "from instruments"
        val instruments = namedTemplate.query(sql) { rs, _ -> rs.toInstrument() }
        return instruments.filter { it matches criteria }
    }

    override fun totalElements(): Long {
        val sql = "select count(*) from instruments"
        return namedTemplate.queryForObject(sql, mapOf<String, Any>(), Long::class.java)!!
    }

    override fun removeInstrument(id: InstrumentId) {
        val sql = "delete from instruments where instrument_id = :instrument_id"
        val params = MapSqlParameterSource().addValue("instrument_id", id.toLongValue())
        namedTemplate.update(sql, params, keyHolder)
    }

    override fun save(instrument: Instrument) {
        val sql = "insert into instruments (instrument_name, instrument_type, manufacturer_name, manufacturer_date, release_date, country, materials) " +
            "values (:instrument_name, :instrument_type, :manufacturer_name, :manufacturer_date, :release_date, :country, :materials)"
        val params = MapSqlParameterSource()
            .addValue("instrument_name", instrument.name.toStringValue())
            .addValue("instrument_type", instrument.type.name)
            .addValue("manufacturer_name", instrument.manufacturer.name)
            .addValue("manufacturer_date", instrument.manufactureDate.toInstantValue())
            .addValue("release_date", instrument.releaseDate.toInstantValue())
            .addValue("country", instrument.country.name)
            .addValue("materials", instrument.materials)
        namedTemplate.update(sql, params)
    }
}

fun ResultSet.toInstrument() = Instrument(
    id = InstrumentId.from(this.getLong("instrument_id")),
    name = InstrumentName.from(this.getString("instrument_name")),
    type = Instrument.Type.valueOf(this.getString("instrument_type")),
    manufacturer = Manufacturer.valueOf(this.getString("manufacturer_name")),
    manufactureDate = ManufacturerDate.from(this.getTimestamp("manufacturer_date").toInstant()),
    releaseDate = ReleaseDate.from(this.getTimestamp("release_date").toInstant()),
    country = Country.valueOf(this.getString("country")),
    materials = (this.getArray("materials").getArray() as Array<String>).toList().map { Material.valueOf(it) },
    version = Version.new(),
)
