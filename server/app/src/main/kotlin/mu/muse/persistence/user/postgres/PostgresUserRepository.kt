package mu.muse.persistence.user.postgres

import mu.muse.common.types.Version
import mu.muse.domain.user.FullName
import mu.muse.domain.user.Password
import mu.muse.domain.user.Role
import mu.muse.domain.user.User
import mu.muse.domain.user.UserId
import mu.muse.domain.user.Username
import mu.muse.usecase.access.user.UserExtractor
import mu.muse.usecase.access.user.UserPersister
import org.slf4j.LoggerFactory
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import org.springframework.jdbc.support.GeneratedKeyHolder
import java.sql.ResultSet

class PostgresUserRepository(
    private val namedTemplate: NamedParameterJdbcTemplate,
) : UserExtractor, UserPersister {
    companion object {
        val logger = LoggerFactory.getLogger(PostgresUserRepository::class.java)
    }

    private val keyHolder = GeneratedKeyHolder()

    override fun findByUsername(username: Username): User? {
        val sql = "select user_id, username, password, role, full_name from users where username = :username"
        val params = MapSqlParameterSource().addValue("username", username.toStringValue())
        return namedTemplate.queryForObject(sql, params) { rs, _ -> rs.toUser()}
    }

    override fun findAll(): Collection<User> {
        val sql = "select user_id, username, password, role, full_name from users"
        return namedTemplate.query(sql) { rs, _ -> rs.toUser() }
    }
    ------------------

    TODO: ИСПОЛЬЗОВАТЬ SEQUENCE для IDшников!!!!

    --------




    override fun save(user: User) {
        val sql = "insert into users (username, password, role, full_name) values (:username, :password, :role, :full_name)"
        val params = MapSqlParameterSource()
            .addValue("username", user.username)
            .addValue("password", user.password)
            .addValue("role", user.role)
            .addValue("full_name", user.fullName.toStringValue())
        val userIdRaw = namedTemplate.update(sql, params, keyHolder)
        logger.info("Created user `${user.username}` with id `${userIdRaw}`")
    }
}

fun ResultSet.toUser() = User(
    id = UserId.from(this.getLong("user_id")),
    username = Username.from(this.getString("username")),
    password = Password.from(this.getString("password")),
    role = Role.from(this.getString("role")),
    fullName = FullName.from(this.getString("full_name")),
    version = Version.new(),
)
