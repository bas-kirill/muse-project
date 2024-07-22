package mu.muse.application.muse

import mu.muse.common.types.Version
import mu.muse.domain.User
import mu.muse.domain.Username
import mu.muse.persistence.InMemoryUserRepository
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class PersistenceConfiguration {

    @Bean
    fun users(): Set<User> {
        val anonymous = User.create(
            Username.from("anonymous"),
            "{noop}123",
            "ROLE_ANONYMOUS",
            "Anonymous",
            Version.new(),
        )
        val editor = User.create(
            Username.from("editor"),
            "{noop}321",
            "ROLE_EDITOR",
            "Editor",
            Version.new(),
        )
        return setOf(anonymous, editor)
    }

    @Bean
    fun userRepository(users: Set<User>): InMemoryUserRepository {
        return InMemoryUserRepository(users.associateBy { it.id }.toMutableMap())
    }

}
