package mu.muse.application.muse

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
        hikariConfig.username = System.getenv("POSTGRES_USER")
        hikariConfig.password = System.getenv("POSTGRES_PASSWORD")
        val pgDb = System.getenv("POSTGRES_DB")
        hikariConfig.jdbcUrl = "jdbc:postgresql://localhost:5432/${pgDb}"
        val hikariDatasource = HikariDataSource(hikariConfig)
        // 25 is a good enough data pool size, it is a database in a container after all
        hikariDatasource.maximumPoolSize = 25
        return hikariDatasource
    }

    @Bean
    fun namedTemplate(dataSource: DataSource): NamedParameterJdbcTemplate {
        return NamedParameterJdbcTemplate(dataSource)
    }

    @Bean
    fun userIdGenerator() = PostgresUserIdGenerator()

    @Bean
    fun userRepository(namedTemplate: NamedParameterJdbcTemplate) = PostgresUserRepository(namedTemplate)

    @Bean
    fun instrumentIdGenerator() = PostgresInstrumentIdGenerator()

    @Bean
    fun instrumentRepository(namedTemplate: NamedParameterJdbcTemplate) = PostgresInstrumentRepository(namedTemplate)
}
