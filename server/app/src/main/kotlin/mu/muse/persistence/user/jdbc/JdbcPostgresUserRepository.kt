package mu.muse.persistence.user.jdbc

import mu.muse.common.types.Version
import mu.muse.domain.instrument.InstrumentId
import mu.muse.domain.user.FullName
import mu.muse.domain.user.Password
import mu.muse.domain.user.Role
import mu.muse.domain.user.User
import mu.muse.domain.user.UserId
import mu.muse.domain.user.Username
import mu.muse.usecase.access.user.UserExtractor
import mu.muse.usecase.access.user.UserPersister
import org.slf4j.LoggerFactory
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import java.sql.ResultSet

class JdbcPostgresUserRepository(
    private val namedTemplate: NamedParameterJdbcTemplate,
) : UserExtractor, UserPersister {
    companion object {
        val logger = LoggerFactory.getLogger(JdbcPostgresUserRepository::class.java)
    }

    @Suppress("SwallowedException")
    override fun findByUsername(username: Username): User? {

        val sql = """
            select
              user_id, username, password, role, full_name, favorite_ids
            from users
            where username = :username
        """.trimIndent()
        val params = mapOf("username" to username.toStringValue())
        return try {
            namedTemplate.queryForObject(sql, params) { rs, _ -> rs.toUser() }
        } catch (e: EmptyResultDataAccessException) {
            null
        }
    }

    override fun findAll(): Collection<User> {
        val sql = "select user_id, username, password, role, full_name, favorite_ids from users"
        return namedTemplate.query(sql) { rs, _ -> rs.toUser() }
    }

    override fun save(user: User) {
        val sql = """
            insert into users
              (user_id, username, password, role, full_name, favorite_ids)
            values
              (:user_id, :username, :password, :role, :full_name, :favorite_ids)
            on conflict (user_id) do update
            set
              user_id = :user_id,
              username = :username,
              password = :password,
              role = :role,
              full_name = :full_name,
              favorite_ids = :favorite_ids
            """.trimIndent()
        val params = mapOf(
            "user_id" to user.id.toLongValue(),
            "username" to user.username.toStringValue(),
            "password" to user.password.toPlainStringValue(),
            "role" to user.role.toStringValue(),
            "full_name" to user.fullName.toStringValue(),
            "favorite_ids" to user.favoriteIds.map { it.toLongValue() }.toTypedArray(),
        )
        val userIdRaw = namedTemplate.update(sql, params)
        logger.info("Upserted user `${user.username}` with id `${userIdRaw}`")
    }
}

fun Array<Long>.toInstrumentIds() = this.map { InstrumentId.from(it) }.toMutableList()
fun ResultSet.toUser() = User(
    id = UserId.from(this.getLong("user_id")),
    username = Username.from(this.getString("username")),
    password = Password.from(this.getString("password")),
    role = Role.from(this.getString("role")),
    fullName = FullName.from(this.getString("full_name")),
    favoriteIds = (this.getArray("favorite_ids").getArray() as Array<Long>).toInstrumentIds(),
    version = Version.new(),
)
