package mu.muse.usecase.scenario.registration

import mu.muse.domain.IdGenerator
import mu.muse.domain.user.FullName
import mu.muse.domain.user.Password
import mu.muse.domain.user.Role
import mu.muse.domain.user.User
import mu.muse.domain.user.UserId
import mu.muse.domain.user.Username
import mu.muse.usecase.RegisterUser
import mu.muse.usecase.RegisterUserError
import mu.muse.usecase.access.user.UserExtractor
import mu.muse.usecase.access.user.UserPersister
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.security.crypto.password.PasswordEncoder

class RegisterUserUseCase(
    private val idGenerator: IdGenerator<UserId>,
    private val userExtractor: UserExtractor,
    private val userPersister: UserPersister,
    private val passwordEncoder: PasswordEncoder,
) : RegisterUser {

    companion object {
        val logger: Logger = LoggerFactory.getLogger(RegisterUserUseCase::class.java)
    }

    override fun execute(fullName: FullName, username: Username, password: Password) {
        // TODO(unit-of-work): use unit of work there
        // do not keep it idempotent, we want to show error if we submit same data once again
        userExtractor.findByUsername(username)?.let {
            throw RegisterUserError.AlreadyRegistered(username)
        }

        logger.info("User `{}` not registered yet", username.toStringValue())

        val user = User.create(
            id = idGenerator.generate(),
            username = username,
            password = passwordEncoder.encode(password),
            role = Role.user(),
            fullName = fullName,
        )

        userPersister.save(user)
    }
}

fun PasswordEncoder.encode(password: Password) = Password.from(this.encode(password.toPlainStringValue()))
