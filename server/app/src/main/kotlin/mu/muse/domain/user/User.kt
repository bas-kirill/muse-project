package mu.muse.domain.user

import mu.muse.common.types.AggregateRoot
import mu.muse.common.types.Version
import mu.muse.domain.IdGenerator
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

typealias FullName = String

class User internal constructor(
    id: UsernameId,
    val username: Username,
    val password: Password,
    val role: Role,
    val fullName: FullName,
    version: Version,
) : AggregateRoot<UsernameId>(id, version), UserDetails {

    companion object {
        fun create(
            idGenerator: IdGenerator<UsernameId>,
            username: Username,
            password: Password,
            role: Role,
            fullName: FullName,
        ): User {
            return User(
                id = idGenerator.generate(),
                username = username,
                password = password,
                role = role,
                fullName = fullName,
                version = Version.new()
            )
        }
    }

    override fun getAuthorities() = listOf(SimpleGrantedAuthority(role.toAuthority()))
    override fun getPassword() = password.toPlainStringValue()
    override fun getUsername() = username.toStringValue()
    override fun isAccountNonExpired() = true
    override fun isAccountNonLocked() = true
    override fun isCredentialsNonExpired() = true
    override fun isEnabled() = true
}
