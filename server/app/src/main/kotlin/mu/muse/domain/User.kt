package mu.muse.domain

import mu.muse.common.types.AggregateRoot
import mu.muse.common.types.Version
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

class User private constructor(
    id: Username,
    private val password: String,
    internal val authority: String,
    private val fullName: String,
    version: Version,
) : AggregateRoot<Username>(id, version), UserDetails {

    companion object {
        fun create(
            id: Username,
            password: String,
            authority: String,
            fullName: String,
            version: Version,
        ): User {
            return User(id, password, authority, fullName, version)
        }
    }

    override fun getAuthorities(): Collection<GrantedAuthority> {
        return listOf(SimpleGrantedAuthority(authority))
    }

    override fun getPassword(): String {
        return password
    }

    override fun getUsername(): String {
        return id.toStringValue()
    }

    override fun isAccountNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        return true
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    override fun isEnabled(): Boolean {
        return true
    }
}
