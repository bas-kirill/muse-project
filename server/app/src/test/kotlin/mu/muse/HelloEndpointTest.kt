package mu.muse

import mu.muse.application.muse.SecurityConfiguration
import mu.muse.domain.IdGenerator
import mu.muse.domain.user.Password
import mu.muse.domain.user.Role
import mu.muse.domain.user.User
import mu.muse.domain.user.Username
import mu.muse.domain.user.UserId
import mu.muse.persistence.user.InMemoryUserRepository
import mu.muse.persistence.user.InMemoryUsernameIdGenerator
import mu.muse.rest.HelloEndpoint
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.crypto.factory.PasswordEncoderFactories
import org.springframework.security.test.context.support.WithAnonymousUser
import org.springframework.security.test.context.support.WithUserDetails
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get

@WebMvcTest
@ContextConfiguration(classes = [HelloEndpointTest.TestConfiguration::class, SecurityConfiguration::class])
internal class HelloEndpointTest {

    @Autowired
    lateinit var mockMvc: MockMvc

    @Test
    @WithAnonymousUser
    fun `anonymous user -- unauthorized`() {
        mockMvc
            .get("/hello")
            .andDo { print() }
            .andExpect {
                status { isUnauthorized() }
            }
    }

    @Test
    @WithUserDetails(value = "user")
    fun `authenticated user with role 'USER' -- forbidden`() {
        mockMvc
            .get("/hello")
            .andDo { print() }
            .andExpect {
                status { isForbidden() }
            }
    }

    @Test
    @WithUserDetails(value = "editor")
    fun `authenticated user with role 'EDITOR' -- success`() {
        mockMvc
            .get("/hello")
            .andDo { print() }
            .andExpect {
                status { isOk() }
                content {
                    string("Hello, World!")
                }
            }
    }

    @Configuration
    class TestConfiguration {

        @Bean
        fun helloEndpoint() = HelloEndpoint()

        @Bean
        fun usernameIdGenerator() = InMemoryUsernameIdGenerator()

        @Bean
        fun users(idGenerator: IdGenerator<UserId>): Set<User> {
            val passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder()

            val testUser = User.create(
                id = idGenerator.generate(),
                username = Username.from("user"),
                password = Password.from(passwordEncoder.encode("123")),
                role = Role.user(),
                fullName = "Anonymous",
            )

            val testEditor = User.create(
                id = idGenerator.generate(),
                username = Username.from("editor"),
                password = Password.from(passwordEncoder.encode("321")),
                role = Role.editor(),
                fullName = "Editor",
            )

            return setOf(testUser, testEditor)
        }

        @Bean
        fun userRepository(users: Set<User>): InMemoryUserRepository {
            return InMemoryUserRepository(users.associateBy { it.username }.toMutableMap())
        }
    }
}
