package mu.muse.domain

import mu.muse.common.types.AggregateRoot
import mu.muse.common.types.Version
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

class User internal constructor(
    id: Username,
    val password: Password,
    val role: Role,
    val fullName: String,
    version: Version,
) : AggregateRoot<Username>(id, version), UserDetails {

    companion object {
        fun create(
            id: Username,
            password: Password,
            role: Role,
            fullName: String,
            version: Version,
        ): User {
            return User(id, password, role, fullName, version)
        }
    }

    override fun getAuthorities() = listOf(SimpleGrantedAuthority(role.toAuthority()))
    override fun getPassword() = password.toPlainStringValue()
    override fun getUsername() = id.toStringValue()
    override fun isAccountNonExpired() = true
    override fun isAccountNonLocked() = true
    override fun isCredentialsNonExpired() = true
    override fun isEnabled() = true
}
