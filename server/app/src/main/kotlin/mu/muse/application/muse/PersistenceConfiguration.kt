package mu.muse.application.muse

import POSTGRES_DB
import POSTGRES_PASSWORD_ENV
import POSTGRES_USER_ENV
import SERVER_JDBC_URL_ENV
import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import mu.muse.persistence.instrument.postgres.PostgresInstrumentIdGenerator
import mu.muse.persistence.instrument.postgres.PostgresInstrumentRepository
import mu.muse.persistence.user.postgres.PostgresUserIdGenerator
import mu.muse.persistence.user.postgres.PostgresUserRepository
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import javax.sql.DataSource

@Configuration
class PersistenceConfiguration {

    @Bean
    fun dataSource(): DataSource {
        val hikariConfig = HikariConfig()
        hikariConfig.username = POSTGRES_USER_ENV
        hikariConfig.password = POSTGRES_PASSWORD_ENV
        hikariConfig.driverClassName = "org.postgresql.Driver"
        hikariConfig.jdbcUrl = SERVER_JDBC_URL_ENV
        val hikariDatasource = HikariDataSource(hikariConfig)
        // 25 is a good enough data pool size, it is a database in a container after all
        hikariDatasource.maximumPoolSize = 25
        return hikariDatasource
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
