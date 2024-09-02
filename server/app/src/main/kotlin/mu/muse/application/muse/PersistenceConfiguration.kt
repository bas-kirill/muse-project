package mu.muse.application.muse

import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import mu.muse.persistence.instrument.jooq.JooqPostgresInstrumentIdGenerator
import mu.muse.persistence.instrument.jooq.JooqPostgresInstrumentRepository
import mu.muse.persistence.user.jooq.JooqPostgresUserIdGenerator
import mu.muse.persistence.user.jooq.JooqPostgresUserRepository
import org.jooq.DSLContext
import org.jooq.SQLDialect
import org.jooq.impl.DSL
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
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
    fun dataSource(hikariConfig: HikariConfig): DataSource =
        with(HikariDataSource(hikariConfig)) {
            maximumPoolSize = MAXIMUM_POOL_SIZE
            this
        }

    @Bean
    fun dslContext(dataSource: DataSource): DSLContext = DSL.using(dataSource, SQLDialect.POSTGRES)

    @Bean
    fun userIdGenerator(dslContext: DSLContext) = JooqPostgresUserIdGenerator(dslContext)

    @Bean
    fun userRepository(dslContext: DSLContext) = JooqPostgresUserRepository(dslContext)

    @Bean
    fun instrumentIdGenerator(dslContext: DSLContext) = JooqPostgresInstrumentIdGenerator(dslContext)

    @Bean
    fun instrumentRepository(dslContext: DSLContext) = JooqPostgresInstrumentRepository(dslContext)

}
