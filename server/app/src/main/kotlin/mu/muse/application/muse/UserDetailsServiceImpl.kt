package mu.muse.application.muse

import mu.muse.domain.user.Username
import mu.muse.usecase.access.user.UserExtractor
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService

class UserDetailsServiceImpl(private val userExtractor: UserExtractor) : UserDetailsService {

    override fun loadUserByUsername(username: String): UserDetails? {
        val user = userExtractor.findByUsername(Username.from(username)) ?: return null
        return User(
            user.username.toStringValue(),
            user.password.toPlainStringValue(),
            true,
            true,
            true,
            true,
            listOf(SimpleGrantedAuthority(user.role.toAuthority())),
        )
    }
}
