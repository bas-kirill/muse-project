package mu.muse.application.muse

import mu.muse.domain.IdGenerator
import mu.muse.domain.instrument.Country
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentId
import mu.muse.domain.instrument.InstrumentName
import mu.muse.domain.instrument.ManufacturerDate
import mu.muse.domain.instrument.Manufacturer
import mu.muse.domain.instrument.Material
import mu.muse.domain.instrument.ReleaseDate
import mu.muse.domain.user.Password
import mu.muse.domain.user.Role
import mu.muse.domain.user.User
import mu.muse.domain.user.Username
import mu.muse.domain.user.UsernameId
import mu.muse.persistence.instrument.InMemoryInstrumentIdGenerator
import mu.muse.persistence.instrument.InMemoryInstrumentRepository
import mu.muse.persistence.user.InMemoryUserRepository
import mu.muse.persistence.user.InMemoryUsernameIdGenerator
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.crypto.factory.PasswordEncoderFactories
import java.time.Instant

@Configuration
class PersistenceConfiguration {

    @Bean
    fun usernameIdGenerator() = InMemoryUsernameIdGenerator()

    @Bean
    fun users(idGenerator: IdGenerator<UsernameId>): Set<User> {
        val passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder()

        val user = User.create(
            idGenerator = idGenerator,
            username = Username.from("user"),
            password = Password.from(passwordEncoder.encode("123")),
            role = Role.user(),
            fullName = "User Userov",
        )

        val editor = User.create(
            idGenerator = idGenerator,
            username = Username.from("editor"),
            password = Password.from(passwordEncoder.encode("321")),
            role = Role.editor(),
            fullName = "Editor Editorov",
        )

        return setOf(user, editor)
    }

    @Bean
    fun userRepository(users: Set<User>) = InMemoryUserRepository(users.associateBy { it.username }.toMutableMap())

    @Bean
    fun instrumentIdGenerator() = InMemoryInstrumentIdGenerator()

    @Bean
    fun instruments(idGenerator: IdGenerator<InstrumentId>): Set<Instrument> {

        val releasedGuitar = Instrument.create(
            idGenerator = idGenerator,
            name = InstrumentName.from("Fender Stratocaster"),
            type = Instrument.Type.STRINGED,
            manufacturer = Manufacturer.YAMAHA,
            manufactureDate = ManufacturerDate.from(Instant.parse("2024-07-01T00:00:00Z")),
            releaseDate = ReleaseDate.from(Instant.parse("2024-08-01T00:00:00Z")),
            country = Country.CYPRUS,
            materials = listOf(Material.WOOD),
        )

        val notYetReleasedGuitar = Instrument.create(
            idGenerator = idGenerator,
            name = InstrumentName.from("Fidel Telecastro"),
            type = Instrument.Type.STRINGED,
            manufacturer = Manufacturer.FENDER,
            manufactureDate = ManufacturerDate.from(Instant.parse("2024-07-01T00:00:00Z")),
            releaseDate = ReleaseDate.from(Instant.parse("2100-01-01T00:00:00Z")),
            country = Country.CYPRUS,
            materials = listOf(Material.WOOD),
        )

        val saxophone = Instrument.create(
            idGenerator = idGenerator,
            name = InstrumentName.from("SaxoStar"),
            type = Instrument.Type.WIND,
            manufacturer = Manufacturer.SIGMA,
            manufactureDate = ManufacturerDate.from(Instant.parse("2007-01-01T00:00:00Z")),
            releaseDate = ReleaseDate.from(Instant.parse("2008-07-01T00:00:00Z")),
            country = Country.USA,
            materials = listOf(Material.METALL),
        )

        val piano = Instrument.create(
            idGenerator = idGenerator,
            name = InstrumentName.from("Yamaha CLP-745B"),
            type = Instrument.Type.KEYBOARD,
            manufacturer = Manufacturer.YAMAHA,
            manufactureDate = ManufacturerDate.from(Instant.parse("2007-01-01T00:00:00Z")),
            releaseDate = ReleaseDate.from(Instant.parse("2008-07-01T00:00:00Z")),
            country = Country.USA,
            materials = listOf(Material.WOOD),
        )

        return setOf(notYetReleasedGuitar, releasedGuitar, saxophone, piano)
    }

    @Bean
    fun instrumentRepository(instruments: Set<Instrument>) =
        InMemoryInstrumentRepository(instruments.associateBy { it.id }.toMutableMap())
}
