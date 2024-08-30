package mu.muse.application

import mu.muse.domain.IdGenerator
import mu.muse.domain.instrument.Country
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentId
import mu.muse.domain.instrument.InstrumentName
import mu.muse.domain.instrument.InstrumentBase64Photo
import mu.muse.domain.instrument.Manufacturer
import mu.muse.domain.instrument.ManufacturerDate
import mu.muse.domain.instrument.Material
import mu.muse.domain.instrument.ReleaseDate
import mu.muse.domain.user.FullName
import mu.muse.domain.user.Password
import mu.muse.domain.user.Role
import mu.muse.domain.user.User
import mu.muse.domain.user.UserId
import mu.muse.domain.user.Username
import mu.muse.usecase.access.instrument.InstrumentPersister
import mu.muse.usecase.access.user.UserPersister
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import
import java.time.Instant

@Configuration
@EnableAutoConfiguration
@Import(ApplicationConfiguration::class)
class Application : CommandLineRunner {

    @Autowired
    lateinit var userIdGenerator: IdGenerator<UserId>

    @Autowired
    lateinit var userPersister: UserPersister

    @Autowired
    lateinit var instrumentIdGenerator: IdGenerator<InstrumentId>

    @Autowired
    lateinit var instrumentPersister: InstrumentPersister

    @Suppress("LongMethod")
    // todo(tech-debt): use 2 different CLI runners and add dev profile
    override fun run(vararg args: String?) {
        val rockGuitar = Instrument.create(
            id = instrumentIdGenerator.generate(),
            name = InstrumentName.from("Fidel Telecastro"),
            type = Instrument.Type.STRINGED,
            manufacturerType = Manufacturer.Type.FENDER,
            manufactureDate = ManufacturerDate.from(Instant.parse("2024-07-01T00:00:00Z")),
            releaseDate = ReleaseDate.from(Instant.parse("2100-01-01T00:00:00Z")),
            country = Country.CYPRUS,
            materialTypes = listOf(Material.Type.WOOD),
            image = InstrumentBase64Photo.fromByteArray(
                javaClass.getResourceAsStream("/image/rock_guitar.webp").use { it!!.readBytes() },
            ),
        )

        val saxophone = Instrument.create(
            id = instrumentIdGenerator.generate(),
            name = InstrumentName.from("SaxoStar"),
            type = Instrument.Type.WIND,
            manufacturerType = Manufacturer.Type.SIGMA,
            manufactureDate = ManufacturerDate.from(Instant.parse("2007-01-01T00:00:00Z")),
            releaseDate = ReleaseDate.from(Instant.parse("2008-07-01T00:00:00Z")),
            country = Country.USA,
            materialTypes = listOf(Material.Type.METAL),
            image = InstrumentBase64Photo.fromByteArray(
                javaClass.getResourceAsStream("/image/saxo.webp").use { it!!.readBytes() },
            ),
        )

        val guitar = Instrument.create(
            id = instrumentIdGenerator.generate(),
            name = InstrumentName.from("Yamaha CLP-745B"),
            type = Instrument.Type.KEYBOARD,
            manufacturerType = Manufacturer.Type.YAMAHA,
            manufactureDate = ManufacturerDate.from(Instant.parse("2007-01-01T00:00:00Z")),
            releaseDate = ReleaseDate.from(Instant.parse("2008-07-01T00:00:00Z")),
            country = Country.USA,
            materialTypes = listOf(Material.Type.WOOD),
            image = InstrumentBase64Photo.fromByteArray(
                javaClass.getResourceAsStream("/image/guitar.webp").use { it!!.readBytes() },
            ),
        )

        val violin = Instrument.create(
            id = instrumentIdGenerator.generate(),
            name = InstrumentName.from("Grand Violin"),
            type = Instrument.Type.KEYBOARD,
            manufacturerType = Manufacturer.Type.YAMAHA,
            manufactureDate = ManufacturerDate.from(Instant.parse("1927-01-01T00:00:00Z")),
            releaseDate = ReleaseDate.from(Instant.parse("1955-07-01T00:00:00Z")),
            country = Country.USA,
            materialTypes = listOf(Material.Type.WOOD),
            image = InstrumentBase64Photo.fromByteArray(
                javaClass.getResourceAsStream("/image/violin.webp").use { it!!.readBytes() },
            ),
        )

        val fortepiano = Instrument.create(
            id = instrumentIdGenerator.generate(),
            name = InstrumentName.from("Classic Grand Piano"),
            type = Instrument.Type.KEYBOARD,
            manufacturerType = Manufacturer.Type.STEINWAY_AND_SONS,
            manufactureDate = ManufacturerDate.from(Instant.parse("2024-01-15T00:00:00Z")),
            releaseDate = ReleaseDate.from(Instant.parse("2024-08-01T00:00:00Z")),
            country = Country.GERMANY,
            materialTypes = listOf(Material.Type.WOOD, Material.Type.STEEL, Material.Type.IVORY, Material.Type.EBONY),
            image = InstrumentBase64Photo.fromByteArray(
                javaClass.getResourceAsStream("/image/fortepiano.webp").use { it!!.readBytes() },
            ),
        )

        sequenceOf(
            rockGuitar,
            saxophone,
            guitar,
            violin,
            fortepiano,
        ).forEach { instrument ->
            instrumentPersister.save(instrument)
        }

        val user = User.create(
            id = userIdGenerator.generate(),
            username = Username.from("user"),
            password = Password.from("{noop}123"),
            role = Role.user(),
            fullName = FullName.from("User Userov"),
            favoriteIds = mutableListOf(saxophone.id, fortepiano.id),
        )

        val editor = User.create(
            id = userIdGenerator.generate(),
            username = Username.from("editor"),
            password = Password.from("{noop}321"),
            role = Role.editor(),
            fullName = FullName.from("Editor Editorov"),
            favoriteIds = mutableListOf(violin.id, rockGuitar.id),
        )

        sequenceOf(
            user,
            editor,
        ).forEach {
            userPersister.save(it)
        }
    }
}

fun main(args: Array<String>) {
    runApplication<Application>(*args)
}
