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

//    val POSTGRES_USER_ENV = System.getenv("POSTGRES_USER") ?: throw RuntimeException("`POSTGRES_USER` env not found")
//    val POSTGRES_PASSWORD_ENV = System.getenv("POSTGRES_PASSWORD") ?: throw RuntimeException("`POSTGRES_PASSWORD` env not found")
//    val POSTGRES_DB = System.getenv("POSTGRES_DB") ?: throw RuntimeException("`POSTGRES_DB` env not found")
//    val SERVER_JDBC_URL_ENV = System.getenv("POSTGRES_DSN") ?: throw RuntimeException("`SERVER_JDBC_URL` env not found")


    @Value("\${POSTGRES_USER}")
    private lateinit var postgresUser: String

    @Value("\${POSTGRES_PASSWORD}")
    private lateinit var postgresPassword: String

    @Value("\${POSTGRES_DSN}")
    private lateinit var postgresDsn: String


    @Bean
    fun dataSource(): DataSource {
        val hikariConfig = HikariConfig()
        hikariConfig.username = postgresUser
        hikariConfig.password = postgresPassword
        hikariConfig.driverClassName = "org.postgresql.Driver"
        hikariConfig.jdbcUrl = postgresDsn
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
