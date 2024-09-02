package mu.muse.persistence.user.jooq

import mu.muse.codegen.jooq.public.tables.Users.Companion.USERS
import mu.muse.codegen.jooq.public.tables.pojos.Users
import mu.muse.domain.instrument.InstrumentId
import mu.muse.domain.user.FullName
import mu.muse.domain.user.Password
import mu.muse.domain.user.Role
import mu.muse.domain.user.User
import mu.muse.domain.user.UserId
import mu.muse.domain.user.Username
import mu.muse.usecase.access.user.UserExtractor
import mu.muse.usecase.access.user.UserPersister
import org.jooq.DSLContext

class JooqPostgresUserRepository(
    private val dslContext: DSLContext,
) : UserExtractor, UserPersister {
    override fun findByUsername(username: Username): User? {
        val userRecordResult = runCatching {
            dslContext.selectFrom(USERS)
                .where(USERS.USERNAME.eq(username.toStringValue()))
                .fetchSingleInto(Users::class.java)
        }
        val userRecordRaw = userRecordResult.getOrNull() ?: return null
        return userRecordRaw.toUser()
    }

    override fun findAll(): Collection<User> {
        val users = dslContext.selectFrom(USERS).fetchInto(Users::class.java)
        return users.map { it.toUser() }
    }

    override fun save(user: User) {
        dslContext.insertInto(
            USERS,
            USERS.USER_ID,
            USERS.USERNAME,
            USERS.PASSWORD,
            USERS.ROLE,
            USERS.FULL_NAME,
            USERS.FAVORITE_IDS,
        )
            .values(
                user.id.toLongValue(),
                user.username.toStringValue(),
                user.password.toPlainStringValue(),
                user.role.toStringValue(),
                user.fullName.toStringValue(),
                user.favoriteIds.map { it.toLongValue() }.toTypedArray(),
            )
            .onConflictDoNothing()
            .execute()
    }
}

fun Array<Long?>?.toFavoriteIds(): MutableList<InstrumentId> {
    require(this != null) { "Favorite IDS `${this}` cannot be null" }
    return this.map { InstrumentId.from(it) }.toMutableList()
}

fun Users.toUser(): User = User.create(
    id = UserId.from(this.userId),
    username = Username.from(this.username),
    password = Password.from(this.password),
    role = Role.from(this.role),
    fullName = FullName.from(this.fullName),
    favoriteIds = this.favoriteIds.toFavoriteIds(),
)
