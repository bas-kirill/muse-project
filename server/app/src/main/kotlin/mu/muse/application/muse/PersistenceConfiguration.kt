package mu.muse.application.muse

import mu.muse.common.types.Version
import mu.muse.domain.Password
import mu.muse.domain.Role
import mu.muse.domain.User
import mu.muse.domain.Username
import mu.muse.persistence.InMemoryUserRepository
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.crypto.factory.PasswordEncoderFactories

@Configuration
class PersistenceConfiguration {

    @Bean
    fun users(): Set<User> {
        val passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder()
        val anonymous = User.create(
            Username.from("user"),
            Password.from(passwordEncoder.encode("123")),
            Role.user(),
            "Somebody Somebodynov",
            Version.new(),
        )

        val editor = User.create(
            Username.from("editor"),
            Password.from(passwordEncoder.encode("321")),
            Role.editor(),
            "Editor Editorov",
            Version.new(),
        )
        return setOf(anonymous, editor)
    }

    @Bean
    fun userRepository(users: Set<User>): InMemoryUserRepository {
        return InMemoryUserRepository(users.associateBy { it.id }.toMutableMap())
    }

}
