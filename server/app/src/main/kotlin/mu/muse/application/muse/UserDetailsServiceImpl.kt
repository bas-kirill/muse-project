package mu.muse.application.muse

import mu.muse.domain.user.Username
import mu.muse.usecase.access.UserExtractor
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService

class UserDetailsServiceImpl(private val userRepository: UserExtractor) : UserDetailsService {

    override fun loadUserByUsername(username: String): UserDetails? {
        return userRepository.findByUsername(Username.from(username))
    }
}
