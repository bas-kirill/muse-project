package mu.muse.application.muse

import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import mu.muse.persistence.instrument.postgres.PostgresInstrumentIdGenerator
import mu.muse.persistence.instrument.postgres.PostgresInstrumentRepository
import mu.muse.persistence.user.postgres.PostgresUserIdGenerator
import mu.muse.persistence.user.postgres.PostgresUserRepository
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import javax.sql.DataSource

@Configuration
class PersistenceConfiguration {

    @Value("\${POSTGRES_USER}")
    private lateinit var postgresUser: String

    @Value("\${POSTGRES_PASSWORD}")
    private lateinit var postgresPassword: String

    @Value("\${POSTGRES_DSN}")
    private lateinit var postgresDsn: String

    companion object {
        const val MAXIMUM_POOL_SIZE = 25
    }

    @Bean
    fun hikariConfig() = with(HikariConfig()) {
        username = postgresUser
        password = postgresPassword
        driverClassName = "org.postgresql.Driver"
        jdbcUrl = postgresDsn
        this
    }

    @Bean
    fun dataSource(hikariConfig: HikariConfig): DataSource = with(HikariDataSource(hikariConfig)) {
        maximumPoolSize = MAXIMUM_POOL_SIZE
        this
    }

    @Bean
    fun namedTemplate(dataSource: DataSource) = NamedParameterJdbcTemplate(dataSource)

    @Bean
    fun userIdGenerator(namedTemplate: NamedParameterJdbcTemplate) = PostgresUserIdGenerator(namedTemplate)

    @Bean
    fun userRepository(namedTemplate: NamedParameterJdbcTemplate) = PostgresUserRepository(namedTemplate)

    @Bean
    fun instrumentIdGenerator(namedTemplate: NamedParameterJdbcTemplate) = PostgresInstrumentIdGenerator(namedTemplate)

    @Bean
    fun instrumentRepository(namedTemplate: NamedParameterJdbcTemplate) = PostgresInstrumentRepository(namedTemplate)


}
