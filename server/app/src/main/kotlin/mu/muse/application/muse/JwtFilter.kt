package mu.muse.application.muse

import io.jsonwebtoken.JwtParser
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import mu.muse.domain.user.Username
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.web.filter.OncePerRequestFilter

class JwtFilter(
    private val userDetailsService: UserDetailsService,
    private val jwtParser: JwtParser,
) : OncePerRequestFilter() {

    override fun doFilterInternal(request: HttpServletRequest, response: HttpServletResponse, chain: FilterChain) {
        val authHeader = request.getHeader("Authorization")
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            chain.doFilter(request, response)
            return
        }

        val jwtRaw = authHeader.substring("Bearer ".length)
        val claims = jwtParser.parseClaimsJws(jwtRaw).body

        if (SecurityContextHolder.getContext().authentication == null) {
            val username = Username.from(claims.subject)
            val user = userDetailsService.loadUserByUsername(username.toStringValue())
            val authToken = UsernamePasswordAuthenticationToken(
                user,
                null,
                user.authorities,
            )

            authToken.details = WebAuthenticationDetailsSource().buildDetails(request)
            SecurityContextHolder.getContext().authentication = authToken
        }
        chain.doFilter(request, response)
    }
}
